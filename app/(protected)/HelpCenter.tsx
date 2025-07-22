import { Pressable, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	Entypo,
	FontAwesome,
	FontAwesome6,
	Ionicons,
	MaterialCommunityIcons,
	Octicons,
} from "@expo/vector-icons";
import { faqData } from "@/constants/data";
import { router } from "expo-router";

const tabNames = ["FAQ", "Contact Us"];

const HelpCenter = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [activeFaq, setActiveFaq] = useState(0);

	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="bg-white h-full pt-8">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Text className="text-2xl font-bold text-g60 pl-3">Help Center</Text>
				</View>
				<View className="pt-8 px-6 flex flex-row justify-between items-center">
					{tabNames.map((item, idx) => (
						<Pressable
							onPress={() => setActiveTab(idx)}
							key={`${item}`}
							className={`justify-center items-center w-1/2 border-b-2   pb-2 ${
								activeTab === idx ? " border-g60" : "border-g30"
							}`}
						>
							<Text
								className={`text-center text-lg ${
									activeTab === idx
										? "text-g60 border-g30"
										: "border-g30 text-g50"
								} font-bold `}
							>
								{item}
							</Text>
						</Pressable>
					))}
				</View>
				{activeTab === 0 && (
					<View className="pt-8 gap-4 px-6">
						{faqData.map(({ id, question, answer }, idx) => (
							<Pressable
								onPress={() => setActiveFaq(idx)}
								className={`p-4 rounded-xl border border-g30 ${
									activeFaq === idx ? "bg-g20" : ""
								}`}
								key={id}
							>
								<View className="flex-row justify-between items-start">
									<Text
										className={`font-semibold text-base pr-5 text-g60 ${
											activeFaq === idx ? "" : ""
										}`}
									>
										{question}
									</Text>
									<Text>
										<Octicons
											name={activeFaq === idx ? "chevron-up" : "chevron-down"}
											size={20}
											color="#3f3f3f"
										/>
									</Text>
								</View>
								{activeFaq === idx && (
									<Text className="pt-3  border-t border-dashed mt-3  border-g50 text-g50 ">
										{answer}
									</Text>
								)}
							</Pressable>
						))}
					</View>
				)}

				{activeTab === 1 && (
					<View className="p-5 rounded-2xl border border-g30 mx-6 flex flex-col mt-8">
						<View className="flex flex-row justify-start items-center pb-4 border-b border-dashed border-g30  gap-2">
							<Ionicons name="headset-outline" size={20} color="#3f3f3f" />
							<Text className="text-base font-bold text-g60">
								Customer Service
							</Text>
						</View>

						<View className="flex flex-row justify-start items-center pb-4 border-b border-dashed border-g30  pt-5 gap-2">
							<FontAwesome name="whatsapp" size={20} color="#3f3f3f" />

							<Text className="text-base font-bold text-g60">WhatsApp</Text>
						</View>
						<View className="flex flex-row justify-start items-center pb-4 border-b border-dashed border-g30  pt-5 gap-2">
							<MaterialCommunityIcons name="web" size={20} color="#3f3f3f" />
							<Text className="text-base font-bold text-g60">Website</Text>
						</View>
						<View className="flex flex-row justify-start items-center pb-4 border-b border-dashed border-g30  pt-5 gap-2">
							<FontAwesome name="facebook" size={20} color="#3f3f3f" />
							<Text className="text-base font-bold text-g60">Facebook</Text>
						</View>
						<View className="flex flex-row justify-start items-center pb-4 border-b border-dashed border-g30  pt-5 gap-2">
							<FontAwesome6 name="x-twitter" size={20} color="#3f3f3f" />
							<Text className="text-base font-bold text-g60">Twitter</Text>
						</View>
						<View className="flex flex-row justify-start items-center  pt-5 gap-2">
							<FontAwesome6 name="instagram" size={20} color="#3f3f3f" />
							<Text className="text-base font-bold text-g60">Instagram</Text>
						</View>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HelpCenter;
