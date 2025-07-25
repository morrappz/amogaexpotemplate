import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/primitives/card";
import { Label } from "@/components/primitives/label";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/config/supabase";
import { toast } from "sonner-native";
import { useAuth } from "@/context/supabase-provider";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getCountries } from "@/lib/country";
import { getStatesByCountry } from "@/lib/states";

export default function BillingAddress() {
	const { session } = useAuth();
	const [loading, setLoading] = useState(false);
	const [billingAddress, setBillingAddress] = useState({
		billing_address_1: "",
		billing_address_2: "",
		billing_city: "",
		billing_state: "",
		billing_country: "",
		billing_postcode: "",
	});
	const [countries, setCountries] = useState([]);
	const [selected, setSelected] = useState("");
	const [states, setStates] = useState([]);

	useEffect(() => {
		Promise.resolve(
			getCountries().then((result) =>
				setCountries(result.map((item) => item.country)),
			),
		);
	}, []);

	useEffect(() => {
		if (!selected) return;

		setLoading(true);
		getStatesByCountry(selected)
			.then((stateList) => setStates(stateList.map((s) => s.name)))
			.finally(() => setLoading(false));
	}, [selected]);

	useEffect(() => {
		if (!billingAddress.billing_country) return;

		setSelected(billingAddress.billing_country); // this triggers state fetch
		setLoading(true);
		getStatesByCountry(billingAddress.billing_country)
			.then((stateList) => setStates(stateList.map((s) => s.name)))
			.finally(() => setLoading(false));
	}, [billingAddress.billing_country]);

	console.log("billing----", billingAddress);
	const updateField = (key: keyof typeof billingAddress, value: string) => {
		setBillingAddress((prev) => ({ ...prev, [key]: value }));
	};

	useEffect(() => {
		const fetchBillingAddress = async () => {
			try {
				const { data, error } = await supabase
					.from("user_catalog")
					.select(
						"billing_address_1,billing_address_2,billing_city,billing_state,billing_country,billing_postcode",
					)
					.eq("user_email", session?.user?.email);
				if (data) {
					setBillingAddress(data[0]);
				}
				if (error) {
					toast.error(`Error: ${error}`);
				}
			} catch (error) {
				toast.error(`Something went wrong ${error}`);
				return;
			}
		};
		fetchBillingAddress();
	}, [session]);

	const handleSave = () => {
		try {
			const saveAddress = async () => {
				setLoading(true);
				const { error } = await supabase
					.from("user_catalog")
					.update({
						billing_address_1: billingAddress.billing_address_1,
						billing_address_2: billingAddress.billing_address_2,
						billing_city: billingAddress.billing_city,
						billing_state: billingAddress.billing_state,
						billing_country: billingAddress.billing_country,
						billing_postcode: billingAddress.billing_postcode,
					})
					.eq("user_email", session?.user?.email);
				if (error) {
					toast.error("Error saving billing address");
					return;
				} else {
					toast.success("Billing Address Saved Successfully");
				}
			};
			saveAddress();
		} catch (error) {
			toast.error(`Something went wrong: ${error}`);
			return;
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="bg-background p-2.5">
				<Card className="bg-card p-2.5">
					<CardContent>
						<View className="pt-5">
							<Label htmlFor="address-1">Address 1</Label>
							<Input
								id="address-1"
								placeholder="Address 1"
								value={billingAddress.billing_address_1}
								onChangeText={(text) => updateField("billing_address_1", text)}
							/>
						</View>

						<View className="pt-5">
							<Label htmlFor="address-2">Address 2</Label>
							<Input
								id="address-2"
								placeholder="Address 2"
								value={billingAddress.billing_address_2}
								onChangeText={(text) => updateField("billing_address_2", text)}
							/>
						</View>

						<View className="pt-5">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								placeholder="City"
								value={billingAddress.billing_city}
								onChangeText={(text) => updateField("billing_city", text)}
							/>
						</View>

						<View className="pt-5">
							<Label htmlFor="country">Country</Label>
							{/* <Input
								id="country"
								placeholder="Country"
								value={billingAddress.billing_country}
								onChangeText={(text) => updateField("billing_country", text)}
							/> */}
							<Select
								value={
									billingAddress.billing_country
										? {
												value: billingAddress.billing_country,
												label: billingAddress.billing_country,
											}
										: undefined
								}
								onValueChange={(value) => {
									if (!value) return;
									setSelected(value.value);
									updateField("billing_country", value.value);
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select a Country" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{countries.map((item, index) => (
											<SelectItem value={item} label={item} key={index}>
												{item}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</View>

						<View className="pt-5">
							<Label htmlFor="state">State</Label>
							<Select
								value={
									billingAddress.billing_state
										? {
												value: billingAddress.billing_state,
												label: billingAddress.billing_state,
											}
										: undefined
								}
								onValueChange={(value) => {
									if (!value) return;
									updateField("billing_state", value.value);
								}}
							>
								<SelectTrigger disabled={!selected}>
									<SelectValue placeholder="Select State" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{states.map((item, index) => (
											<SelectItem value={item} label={item} key={index}>
												{item}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</View>

						<View className="pt-5">
							<Label htmlFor="zip">Zip</Label>
							<Input
								id="zip"
								placeholder="Zip"
								value={billingAddress.billing_postcode}
								onChangeText={(text) => updateField("billing_postcode", text)}
							/>
						</View>
					</CardContent>

					<CardFooter>
						<Button
							disabled={loading}
							className="bg-primary"
							onPress={handleSave}
						>
							{loading ? (
								<Text className="text-secondary">Saving...</Text>
							) : (
								<Text className="text-secondary">Save</Text>
							)}
						</Button>
					</CardFooter>
				</Card>
			</ScrollView>
		</SafeAreaView>
	);
}
