import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import mapImg from "../../../assets/images/show-on-map-bg.png";
import FormField from "@/components/ui/FormField";

const AddressDetails = () => {
	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="pt-6 min-h-screen bg-background">
				<View className="flex-row justify-start items-center  px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60 pl-4">
						Address Details
					</Text>
				</View>
				<View className="px-4 pt-8">
					<View className="border border-g30 rounded-xl p-4">
						<View className="flex-row justify-between items-center border-b border-dashed border-g30 pb-3">
							<View className="flex-row justify-start items-start ">
								<View className="w-8 h-8 flex-row justify-center items-center bg-g60 text-white rounded-full">
									<Feather name="map-pin" size={16} color="white" />
								</View>
								<View>
									<View className="flex-row justify-start items-center pl-1">
										<Text className="text-sm font-medium text-g60 pr-2">
											Jenny Wilson
										</Text>
										<Text className="text-xs text-g50 py-0.5 px-1 bg-g20 border border-g30 rounded-md">
											Apartment
										</Text>
									</View>

									<Text className="flex-row justify-start items-center  text-g50 text-xs pt-3">
										701 7th Ave. New York, NY 10036, USA
									</Text>
								</View>
							</View>

							<View>
								<Feather name="edit" size={18} color="#3f3f3f" />
							</View>
						</View>

						<View className="py-3">
							<Image source={mapImg} />

							<View className="flex-row justify-start items-center  text-white -mt-9 pl-3">
								<Feather name="map-pin" size={16} color="white" />

								<Text className="text-white pl-1">Show on map</Text>
							</View>
						</View>
					</View>
				</View>

				<View className="px-4">
					<View className="pt-4">
						<FormField
							isTitle={true}
							placeholder="Address Labels"
							title="Address Labels"
						/>
					</View>
					<View className="pt-4">
						<FormField
							isTitle={true}
							placeholder="Note..."
							title="Note to Courier (Optional)"
						/>
					</View>
					<View className="pt-4">
						<FormField
							isTitle={true}
							placeholder="Recipient's Name"
							title="Andrew Ainsley"
						/>
					</View>
					<View className="pt-4">
						<FormField
							isTitle={true}
							placeholder="+65424 65464"
							keyboardType="phone-pad"
							title="Recipient's Phone Number"
						/>
					</View>
				</View>

				<View className="flex justify-start items-center  pt-8 px-4">
					<Pressable className="w-full bg-g60 py-3 rounded-lg">
						<Text className="text-center text-white text-base font-semibold">
							Save
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddressDetails;

const styles = StyleSheet.create({});
