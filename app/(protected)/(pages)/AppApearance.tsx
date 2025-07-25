import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import CustomSwitch from "@/components/ui/CustomSwitch";

const AppApearance = () => {
	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="pt-6 min-h-full bg-background">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-muted-foreground pl-3">
						App Appearance
					</Text>
				</View>
				<View className="px-4 pt-8">
					<View className="px-4 py-8 rounded-xl border-border shadow-lg flex-row justify-between items-center border border-g30">
						<Text className="text-g60 text-base">Dark Mode</Text>
						<CustomSwitch />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AppApearance;

const styles = StyleSheet.create({});
