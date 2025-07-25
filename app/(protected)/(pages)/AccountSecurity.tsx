import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { accountSecurityItems } from "@/constants/data";
import CustomSwitch from "@/components/ui/CustomSwitch";

const AccountSecurity = () => {
	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="pt-6 pb-6 min-h-full bg-background">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-popover-foreground  pl-3">
						Account & Security
					</Text>
				</View>

				<View className="border border-border shadow-md bg-g20 rounded-xl px-4 pb-4 mt-8 mx-4">
					{accountSecurityItems.map(({ id, name, icon }, idx) => (
						<View
							key={`${id}`}
							className={`flex-row justify-between items-center  pt-4 ${
								idx + 1 === accountSecurityItems.length
									? ""
									: "pb-3 border-b border-dashed border-g30"
							}`}
						>
							<View className="flex-row justify-start items-center gap-4">
								<View className="bg-secondary p-3 rounded-full border-g30 flex justify-center items-center">
									{icon}
								</View>
								<Text className=" font-medium text-g60">{name}</Text>
							</View>
							<CustomSwitch />
						</View>
					))}
				</View>

				<View className="px-4 pt-8 flex flex-col gap-4">
					<View className="border border-border shadow-sm p-4 rounded-xl">
						<View className="flex-row justify-between items-center">
							<Text className="text-popover-foreground text-sm font-medium">
								Device Management
							</Text>
							<Feather
								name="chevron-right"
								size={24}
								className="text-primary"
							/>
						</View>
						<Text className="text-muted-foreground pt-2 text-xs">
							Device Management oversees and secures devices, ensuring optimal
							performance and security.
						</Text>
					</View>
					<View className="border border-border shadow-sm p-4 rounded-xl">
						<View className="flex-row justify-between items-center">
							<Text className="text-popover-foreground text-sm font-medium">
								Deactivate Account
							</Text>
							<Feather
								name="chevron-right"
								size={24}
								className="text-primary"
							/>
						</View>
						<Text className="text-muted-foreground pt-2 text-xs">
							Device Management oversees and secures devices, ensuring optimal
							performance and security.
						</Text>
					</View>
					<View className="border border-border shadow-sm p-4 rounded-xl">
						<View className="flex-row justify-between items-center">
							<Text className="text-popover-foreground text-sm font-medium">
								Delete Account
							</Text>
							<Feather
								name="chevron-right"
								size={24}
								className="text-primary"
							/>
						</View>
						<Text className="text-muted-foreground pt-2 text-xs">
							Device Management oversees and secures devices, ensuring optimal
							performance and security.
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AccountSecurity;

const styles = StyleSheet.create({});
