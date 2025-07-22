import {
	Image,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import userImg from "@/assets/images/user-img.jpg";
import { accountPageNamesData } from "@/constants/data";
import qrImg from "@/assets/images/qr-code.png";

const Profile = () => {
	const [logoutModal, setLogoutModal] = useState(false);
	const [qrModal, setQrModal] = useState(false);
	return (
		<SafeAreaView
			className={`${
				Platform.OS === "web" && "max-w-[800px] mx-auto"
			} w-full flex-1`}
		>
			<ScrollView className="pt-6 min-h-full bg-white">
				<View className="flex-row justify-between items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60">Account</Text>
					<Pressable onPress={() => router.push("/CameraViewPage")}>
						<AntDesign name="scan1" size={24} color="#3f3f3f" />
					</Pressable>
				</View>
				<View className="px-4 pt-8">
					<View className="flex-row justify-between items-center p-4 bg-g60 rounded-xl">
						<View className="flex-row justify-start items-center gap-4">
							<View className="">
								<Image
									source={userImg}
									className="w-14 h-14 md:hidden rounded-full"
								/>
							</View>
							<View className="">
								<Text className="text-xl font-semibold text-white">
									Albert Flores
								</Text>
								<Text className="text-sm text-white">example@gmail.com</Text>
							</View>
						</View>

						<Pressable
							onPress={() => setQrModal(true)}
							className=" rounded-full !leading-none w-9 h-9 flex justify-center items-center bg-white"
						>
							<MaterialIcons name="qr-code-scanner" size={20} color="#3f3f3f" />
						</Pressable>
					</View>
				</View>

				<View className="px-4 pt-4 pb-10">
					<View className="flex flex-col">
						{accountPageNamesData.map(({ id, name, icon, link }) => (
							<Pressable
								onPress={() => router.push(link as any)}
								key={`${id}`}
								className="flex-row justify-between items-center pb-4 border-b border-dashed border-g30 pt-4"
							>
								<View className="flex-row justify-start items-center gap-4">
									<View className=" rounded-full border border-g30 !leading-none w-10 h-10 flex justify-center items-center bg-g20">
										{icon}
									</View>
									<Text className="text-g60 font-medium text-base">{name}</Text>
								</View>
								<Feather name="chevron-right" size={24} color="#3f3f3f" />
							</Pressable>
						))}
						<Pressable
							onPress={() => setLogoutModal(true)}
							className="flex-row justify-between items-center  pt-4"
						>
							<View className="flex-row justify-start items-center gap-4">
								<View className=" rounded-full border border-g30 !leading-none w-10 h-10 flex justify-center items-center bg-g20">
									<MaterialIcons name="logout" size={20} color="#3f3f3f" />
								</View>
								<Text className="text-g60 font-medium text-base">Logout</Text>
							</View>
						</Pressable>
					</View>
				</View>
			</ScrollView>

			<Modal visible={logoutModal} transparent={true}>
				<View
					className="h-full justify-end "
					style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
				>
					<View className="bg-white px-4 pb-8 rounded-t-xl">
						<Text className="text-2xl text-g60 text-center py-4 border-b border-dashed font-semibold border-g30">
							Logout
						</Text>
						<Text className="text-base text-g50 text-center pt-4 pb-8">
							Do you want to logout?
						</Text>
						<View className="justify-between items-center flex-row ">
							<Pressable
								onPress={() => setLogoutModal(false)}
								className="w-[48%] bg-g60 py-3 rounded-lg"
							>
								<Text className="text-center text-white text-base font-semibold">
									No
								</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									setLogoutModal(false);
									router.push("/SignInPage");
								}}
								className="w-[48%] border border-g60 py-3  rounded-lg"
							>
								<Text className="text-center text-g60 text-base font-semibold">
									Yes, Logout
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			<Modal visible={qrModal} transparent={true}>
				<View
					className="h-full justify-end "
					style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
				>
					<View className="bg-white pb-6 pt-3 rounded-t-xl">
						<View className="flex justify-center items-center flex-col border-b border-dashed border-g30 mx-4">
							<View className="w-14 h-1 bg-g30 rounded-lg"></View>
							<View className="flex-row justify-between items-center w-full">
								<Text className="text-xl font-semibold text-g60 text-center py-3">
									My QR Code
								</Text>
								<Pressable onPress={() => setQrModal(false)}>
									<AntDesign name="closecircleo" size={24} color="#3f3f3f" />
								</Pressable>
							</View>
						</View>
						<View className="flex justify-center items-center pt-4">
							<Image source={qrImg} />
						</View>
						<View className="justify-between items-center flex-row px-4 pt-4">
							<Pressable className=" border border-g60 py-3  rounded-lg mr-2 px-4">
								<AntDesign name="sharealt" size={20} color="#3f3f3f" />
							</Pressable>
							<Pressable className="flex-1 bg-g60 py-3 rounded-lg">
								<Text className="text-center text-white text-base font-semibold">
									Share My QR Code
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({});
