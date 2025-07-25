import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import FormField from "@/components/ui/FormField";
import { Card } from "@/components/primitives/card";
import { useAuth } from "@/context/supabase-provider";
import { supabase } from "@/config/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner-native";

interface UserData {
	first_name: string;
	last_name: string;
	user_email: string;
	user_mobile: string;
	business_name: string;
	business_number: string;
	business_phone_no: string;
	business_postcode: string;
}

const MyProfile = () => {
	const [userData, setUserData] = useState<UserData>({
		first_name: "",
		last_name: "",
		user_email: "",
		user_mobile: "",
		business_name: "",
		business_number: "",
		business_phone_no: "",
		business_postcode: "",
	});
	// const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<
		Partial<Record<keyof UserData | "password", string>>
	>({});

	const { session } = useAuth();
	console.log("session-----", session);

	useEffect(() => {
		const fetchUserData = async () => {
			setLoading(true);
			try {
				const { data, error } = await supabase
					.from("user_catalog")
					.select(
						"first_name,last_name,user_email, user_mobile, business_name, business_number, business_phone_no, business_postcode",
					)
					.eq("user_email", session?.user?.email)
					.single();
				if (error) {
					throw error;
				}
				console.log("data-----", data);
				if (data) {
					setUserData(data);
				}
			} catch (error) {
				throw error;
			} finally {
				setLoading(false);
			}
		};
		fetchUserData();
	}, [session]);

	const handleSubmit = async () => {
		const newErrors: Partial<Record<keyof UserData | "password", string>> = {};

		if (!userData.first_name.trim())
			newErrors.first_name = "First name is required";
		if (!userData.last_name.trim())
			newErrors.last_name = "Last name is required";
		if (!userData.user_email.trim()) newErrors.user_email = "Email is required";
		if (!userData.user_mobile.trim())
			newErrors.user_mobile = "Mobile is required";
		if (!userData.business_name.trim())
			newErrors.business_name = "Business name is required";
		if (!userData.business_number.trim())
			newErrors.business_number = "Business number is required";
		if (!userData.business_postcode.trim())
			newErrors.business_postcode = "Postcode is required";
		if (!userData.business_phone_no.trim())
			newErrors.business_phone_no = "Business phone is required";
		// if (!password.trim()) newErrors.password = "Password is required";

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			try {
				const { data, error } = await supabase
					.from("user_catalog")
					.update({
						first_name: userData?.first_name,
						last_name: userData?.last_name,
						user_email: userData?.user_email,
						user_mobile: userData?.user_mobile,
						business_name: userData?.business_name,
						business_number: userData?.business_number,
						business_postcode: userData?.business_postcode,
						business_phone_no: userData?.business_phone_no,
						// password: password,
					})
					.eq("user_email", session?.user?.email);
				console.log("data-----", data);
				if (error) {
					toast.error(`Error Updating User ${error}`);
				} else {
					toast.success("User Updated Successfully");
				}
				// setPassword("");
			} catch (error) {
				console.log("Something went wrong");
				toast.error(`Something went wrong: ${error}`);
			}
		} else {
			toast.error("Please fill all required fields");
		}
	};

	console.log("loading------", loading);

	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="pt-6 min-h-full bg-background">
				<View className="flex-row pb-8 justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60 pl-3">My Profile</Text>
				</View>
				<View className="p-2.5 pb-8">
					<Card className="bg-card   p-2.5">
						<View className="pt-8 px-6 ">
							<FormField
								value={userData?.first_name}
								isTitle={true}
								onChangeText={(text) =>
									setUserData({ ...userData, first_name: text })
								}
								placeholder="First Name"
								title="First Name"
								required={true}
								error={errors.first_name}
							/>

							<View className="pt-4">
								<FormField
									value={userData?.last_name}
									isTitle={true}
									onChangeText={(text) =>
										setUserData({ ...userData, last_name: text })
									}
									placeholder="Last Name"
									title="Last Name"
									required={true}
									error={errors.last_name}
								/>
							</View>
							<View className="pt-4">
								<FormField
									value={userData?.user_email}
									isTitle={true}
									onChangeText={(text) =>
										setUserData({ ...userData, user_email: text })
									}
									placeholder="Enter email"
									title="Email"
									keyboardType="email-address"
									required={true}
									error={errors.user_email}
								/>
							</View>
							<View className="pt-4">
								<FormField
									value={userData?.user_mobile}
									isTitle={true}
									onChangeText={(text) =>
										setUserData({ ...userData, user_mobile: text })
									}
									placeholder="Mobile"
									title="Mobile"
									keyboardType="phone-pad"
									required={true}
									error={errors.user_mobile}
								/>
							</View>
							<View className="pt-4">
								<FormField
									value={userData?.business_name}
									isTitle={true}
									onChangeText={(text) =>
										setUserData({ ...userData, business_name: text })
									}
									placeholder="Business Name"
									title="Business Name"
									required={true}
									error={errors.business_name}
								/>
							</View>
							<View className="pt-4">
								<FormField
									value={userData?.business_number}
									isTitle={true}
									onChangeText={(text) =>
										setUserData({ ...userData, business_number: text })
									}
									placeholder="Business Number"
									title="Business Number"
									required={true}
									error={errors.business_number}
								/>
							</View>
							<View className="pt-4">
								<FormField
									value={userData?.business_postcode}
									isTitle={true}
									onChangeText={(text) =>
										setUserData({ ...userData, business_postcode: text })
									}
									placeholder="Business ZipCode"
									title="Business ZipCode"
									required={true}
									error={errors.business_postcode}
								/>
							</View>
							<View className="pt-4 pb-4">
								<FormField
									value={userData?.business_phone_no}
									isTitle={true}
									onChangeText={(text) =>
										setUserData({ ...userData, business_phone_no: text })
									}
									placeholder="Business Mobile"
									title="Business Mobile"
									required={true}
									error={errors.business_phone_no}
								/>
							</View>
							{/* <View className="pt-4 pb-4">
								<FormField
									value={password}
									isTitle={true}
									onChangeText={(text) => {
										setPassword(text);
									}}
									placeholder="Password"
									title="Password"
									required={true}
									error={errors.password}
									autoComplete="new-password"
								/>
							</View> */}
							<Button
								disabled={loading}
								className="bg-primary"
								onPress={handleSubmit}
							>
								{loading ? (
									<Text className="text-secondary">Saving...</Text>
								) : (
									<Text className="text-secondary">Save</Text>
								)}
							</Button>
						</View>
					</Card>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyProfile;
