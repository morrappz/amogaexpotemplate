import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
// import MapView from "react-native-maps";

import mapImg from "@/assets/images/map.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const AddNewAddress = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="pt-6 h-full bg-white">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60 pl-3">
						Add New Address
					</Text>
				</View>
				<View className="pt-6">
					<Image source={mapImg} />
				</View>

				<View className="absolute bottom-0 left-0 right-0 flex justify-end items-end">
					<View className="px-4 pt-2 pb-6 rounded-t-2xl bg-white w-full">
						<View className="flex justify-center items-center flex-col pt-4">
							<View className="w-14 h-1 bg-g30 rounded-lg"></View>
						</View>
						<View className="border-b border-dashed border-g30 py-3">
							<Text className="text-base text-g50">
								Confirm your order delivery location
							</Text>
						</View>
						<View className="flex-row justify-start items-center  pt-4">
							<View className="bg-g20 border border-g30 rounded-md py-2 px-[14px]">
								<Ionicons name="map-outline" size={24} color="#3f3f3f" />
							</View>
							<View className="pl-3">
								<Text className="text-g60 font-semibold text-lg">New York</Text>
								<Text className="text-sm text-g50">
									701 7th Ave, NY 10036, USA
								</Text>
							</View>
						</View>
						<View className="flex justify-start items-center  pt-3">
							<Pressable
								onPress={() => router.push("/AddressDetails")}
								className="w-full bg-g60 py-3 rounded-lg"
							>
								<Text className="text-center text-white text-base font-semibold">
									Select Location & Fill Address
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</ScrollView>

			{/* <MapView
        className="h-full"
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={() => setShowModal(true)}
      /> */}

			<Modal visible={false} transparent={true}>
				<View className="h-full justify-end "></View>
			</Modal>
		</SafeAreaView>
	);
};

export default AddNewAddress;
