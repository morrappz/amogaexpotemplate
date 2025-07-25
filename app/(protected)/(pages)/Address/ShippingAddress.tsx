import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/primitives/card";
import { Label } from "@/components/primitives/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/config/supabase";
import { toast } from "sonner-native";
import { useAuth } from "@/context/supabase-provider";
import { getCountries } from "@/lib/country";
import { getStatesByCountry } from "@/lib/states";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function ShippingAddress() {
	const { session } = useAuth();
	const [loading, setLoading] = useState(false);
	const [shippingAddress, setShippingAddress] = useState({
		shipping_address_1: "",
		shipping_address_2: "",
		shipping_city: "",
		shipping_state: "",
		shipping_country: "",
		shipping_postcode: "",
	});
	const [countries, setCountries] = useState([]);
	const [selected, setSelected] = useState("");
	const [states, setStates] = useState([]);

	const updateField = (key: keyof typeof shippingAddress, value: string) => {
		setShippingAddress((prev) => ({ ...prev, [key]: value }));
	};

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
		if (!shippingAddress.shipping_country) return;

		setSelected(shippingAddress.shipping_country); // this triggers state fetch
		setLoading(true);
		getStatesByCountry(shippingAddress.shipping_country)
			.then((stateList) => setStates(stateList.map((s) => s.name)))
			.finally(() => setLoading(false));
	}, [shippingAddress.shipping_country]);

	useEffect(() => {
		const fetchShippingAddress = async () => {
			try {
				const { data, error } = await supabase
					.from("user_catalog")
					.select(
						"shipping_address_1,shipping_address_2,shipping_city,shipping_state,shipping_country,shipping_postcode",
					)
					.eq("user_email", session?.user?.email);
				if (data) {
					setShippingAddress(data[0]);
				}
				console.log("data-----", data);
				if (error) {
					toast.error(`Error: ${error}`);
				}
			} catch (error) {
				toast.error(`Something went wrong ${error}`);
				return;
			}
		};
		fetchShippingAddress();
	}, [session]);

	const handleSave = () => {
		try {
			const saveAddress = async () => {
				setLoading(true);
				const { error } = await supabase
					.from("user_catalog")
					.update({
						shipping_address_1: shippingAddress.shipping_address_1,
						shipping_address_2: shippingAddress.shipping_address_2,
						shipping_city: shippingAddress.shipping_city,
						shipping_state: shippingAddress.shipping_state,
						shipping_country: shippingAddress.shipping_country,
						shipping_postcode: shippingAddress.shipping_postcode,
					})
					.eq("user_email", session?.user?.email);
				if (error) {
					toast.error("Error saving shipping address");
					return;
				} else {
					toast.success("Shipping Address Saved Successfully");
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
								value={shippingAddress.shipping_address_1}
								onChangeText={(text) => updateField("shipping_address_1", text)}
							/>
						</View>

						<View className="pt-5">
							<Label htmlFor="address-2">Address 2</Label>
							<Input
								id="address-2"
								placeholder="Address 2"
								value={shippingAddress.shipping_address_2}
								onChangeText={(text) => updateField("shipping_address_2", text)}
							/>
						</View>

						<View className="pt-5">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								placeholder="City"
								value={shippingAddress.shipping_city}
								onChangeText={(text) => updateField("shipping_city", text)}
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
									shippingAddress.shipping_country
										? {
												value: shippingAddress.shipping_country,
												label: shippingAddress.shipping_country,
											}
										: undefined
								}
								onValueChange={(value) => {
									if (!value) return;
									setSelected(value.value);
									updateField("shipping_country", value.value);
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
									shippingAddress.shipping_state
										? {
												value: shippingAddress.shipping_state,
												label: shippingAddress.shipping_state,
											}
										: undefined
								}
								onValueChange={(value) => {
									if (!value) return;
									updateField("shipping_state", value.value);
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
								value={shippingAddress.shipping_postcode}
								onChangeText={(text) => updateField("shipping_postcode", text)}
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
