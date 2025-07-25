import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import RadioButton from "@/components/ui/RadioButton";

const suggestedLanguage = ["English (UK)", "English (US)"];
const LanguageList = [
	"Chineses (CN)",
	"Croatian",
	"Czech",
	"Danish",
	"Hindi",
	"Spanish",
	"Bengali",
	"Russian",
];

const Language = () => {
	const [selectSuggested, setSelectSuggested] = useState(0);
	const [selectLanguage, setSelectLanguage] = useState(0);
	return (
		<SafeAreaView className="flex-1 pb-5">
			<ScrollView className="pt-6 min-h-full bg-background">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-popover-foreground pl-3">
						Language
					</Text>
				</View>
				<View className="mt-8 mx-6 p-6 border border-border shadow-sm bg-g20 rounded-xl">
					<Text className="text-base font-semibold text-popover-foreground">
						Suggested
					</Text>

					<View className="pt-2 ">
						{suggestedLanguage.map((item, idx) => (
							<Pressable
								onPress={() => setSelectSuggested(idx)}
								key={`${item}`}
								className={`flex-row justify-between items-center pt-4 ${
									suggestedLanguage.length === idx + 1
										? ""
										: "border-b border-dashed border-border pb-4"
								}`}
							>
								<Text className="text-base font-medium text-muted-foreground">
									{item}
								</Text>
								<RadioButton isActive={idx === selectSuggested} />
							</Pressable>
						))}
					</View>
				</View>
				<View className="mt-8 p-6 border border-border shadow-sm  rounded-xl mx-6">
					<Text className="text-base font-semibold text-popover-foreground">
						Language
					</Text>

					<View className="pt-2">
						{LanguageList.map((item, idx) => (
							<Pressable
								onPress={() => setSelectLanguage(idx)}
								key={`${item}`}
								className={`flex-row justify-between items-center pt-4 ${
									LanguageList.length === idx + 1
										? ""
										: "border-b border-dashed border-border pb-4"
								}`}
							>
								<Text className="text-base font-medium text-muted-foreground">
									{item}
								</Text>
								<RadioButton isActive={idx === selectLanguage} />
							</Pressable>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Language;

const styles = StyleSheet.create({});
