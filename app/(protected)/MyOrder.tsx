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
import { AntDesign, Entypo } from "@expo/vector-icons";
const tabNames = ["Active", "Completed", "Cancelled"];
import porductImg from "@/assets/images/product-img-1.png";

const MyOrder = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [cancelModal, setCancelModal] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	return (
		<SafeAreaView
			className={`${
				Platform.OS === "web" && "max-w-[800px] mx-auto"
			} w-full flex-1`}
		>
			<ScrollView className="pt-6 bg-white">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60">My Order</Text>
				</View>
				<View className="pt-8 px-6 flex flex-row justify-between items-center">
					{tabNames.map((item, idx) => (
						<Pressable
							onPress={() => setActiveTab(idx)}
							key={`${item}`}
							className={`justify-center items-center w-1/3 border-b-2   pb-2 ${
								activeTab === idx ? " border-g60" : "border-g30"
							}`}
						>
							<Text
								className={`text-center text-lg ${
									activeTab === idx ? "text-g60 " : "border-g50 text-g50 "
								} font-bold`}
							>
								{item}
							</Text>
						</Pressable>
					))}
				</View>

				{activeTab === 0 && (
					<View className="pt-4 px-6">
						<View className="flex-row justify-between items-center">
							<Text className="text-g60 font-semibold text-base">
								Total Item
							</Text>
							<Text className="text-g60 font-semibold">(4)</Text>
						</View>

						<View className="flex flex-col pt-4">
							<View className="p-4 rounded-xl border bg-g20 border-g30">
								<View
									className="flex-row justify-between items-center pb-2 mb-3 border-b border-dashed border-g30 text-g60"
									style={{ zIndex: 1 }}
								>
									<Text className="text-sm text-g60">March 20, 2024</Text>
									<View className=" ">
										<Pressable onPress={() => setCancelModal((prev) => !prev)}>
											<Entypo
												name="dots-three-vertical"
												size={14}
												color="#3f3f3f"
											/>
										</Pressable>

										<View
											className={`absolute top-7 right-0 bg-white py-3 px-4 rounded-md shadow-2 w-[140px] flex-row justify-start items-center ${
												cancelModal ? "absolute" : "hidden"
											}`}
										>
											<Text>
												<AntDesign name="close" size={16} color="#3f3f3f" />
											</Text>
											<Text
												onPress={() => setShowCancelModal(true)}
												className="text-sm text-g60 pl-1"
											>
												Cancel Order
											</Text>
										</View>
									</View>
								</View>
								<View className="flex-row justify-start items-center ">
									<View className="rounded-lg overflow-hidden">
										<Image source={porductImg} className="w-28 h-36" />
									</View>
									<View className=" pl-4">
										<Text className="text-lg font-medium text-g60">
											Blue Finger Watch
										</Text>
										<Text className="text-g50 text-xs pt-1">
											3+ other products
										</Text>

										<Text className="text-g50 text-xs pt-1">
											Total Shopping
										</Text>
										<View className="flex-row justify-start items-center  pt-2  pb-2">
											<Text className="text-g60 font-semibold pr-2">
												$116.00
											</Text>
											<Text className="text-g40 line-through font-semibold">
												$156.00
											</Text>
										</View>
										<View className="flex-row">
											<Pressable
												onPress={() => router.push("/TrackOrder" as any)}
												className="mr-1"
											>
												<Text className="text-xs font-semibold bg-g60 text-white py-1.5 px-2 text-center rounded-md ">
													Track Order
												</Text>
											</Pressable>
											<Pressable
												className="ml-1"
												onPress={() => router.push("/OrderDetails" as any)}
											>
												<Text className="text-xs font-semibold text-g60 bg-white border border-g30 py-1.5 px-2 text-center rounded-md  ">
													Order Details
												</Text>
											</Pressable>
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>
				)}
				{activeTab === 1 && (
					<View className="pt-4 px-6">
						<View className="flex-row justify-between items-center">
							<Text className="text-g60 font-semibold text-base">
								Total Item
							</Text>
							<Text className="text-g60 font-semibold">(5)</Text>
						</View>

						<View className="flex flex-col pt-4">
							<View className="p-4 rounded-xl border bg-g20 border-g30">
								<View
									className="flex-row justify-between items-center pb-2 mb-3 border-b border-dashed border-g30 text-g60"
									style={{ zIndex: 1 }}
								>
									<Text className="text-sm text-g60">March 20, 2024</Text>
								</View>
								<View className="flex-row justify-start items-center ">
									<View className="rounded-lg overflow-hidden">
										<Image source={porductImg} className="w-28 h-36" />
									</View>
									<View className=" pl-4">
										<Text className="text-lg font-medium text-g60">
											Blue Finger Watch
										</Text>
										<Text className="text-g50 text-xs pt-1">
											3+ other products
										</Text>

										<Text className="text-g50 text-xs pt-1">
											Total Shopping
										</Text>
										<View className="flex-row justify-start items-center  pt-2  pb-2">
											<Text className="text-g60 font-semibold pr-2">
												$116.00
											</Text>
											<Text className="text-g40 line-through font-semibold">
												$156.00
											</Text>
										</View>
										<Pressable
											onPress={() => router.push("/LeaveReview" as any)}
										>
											<Text className="text-base font-semibold bg-g60 text-white py-2 px-4 text-center rounded-md ">
												Submit Review
											</Text>
										</Pressable>
									</View>
								</View>
							</View>
						</View>
					</View>
				)}
				{activeTab === 2 && (
					<View className="pt-4 px-6">
						<View className="flex-row justify-between items-center">
							<Text className="text-g60 font-semibold text-base">
								Total Item
							</Text>
							<Text className="text-g60 font-semibold">(1)</Text>
						</View>

						<View className="flex flex-col pt-4">
							<View className="p-4 rounded-xl border bg-g20 border-g30">
								<View
									className="flex-row justify-between items-center pb-2 mb-3 border-b border-dashed border-g30 text-g60"
									style={{ zIndex: 1 }}
								>
									<Text className="text-sm text-g60">March 20, 2024</Text>
								</View>
								<View className="flex-row justify-start items-center ">
									<View className="rounded-lg overflow-hidden">
										<Image source={porductImg} className="w-28 h-36" />
									</View>
									<View className=" pl-4">
										<Text className="text-lg font-medium text-g60">
											Blue Finger Watch
										</Text>
										<Text className="text-g50 text-xs pt-1">
											3+ other products
										</Text>

										<Text className="text-g50 text-xs pt-1">
											Total Shopping
										</Text>
										<View className="flex-row justify-start items-center  pt-2  pb-2">
											<Text className="text-g60 font-semibold pr-2">
												$116.00
											</Text>
											<Text className="text-g40 line-through font-semibold">
												$156.00
											</Text>
										</View>
										<Pressable>
											<Text className="text-base font-semibold text-g60 bg-white py-2 px-4 text-center rounded-md border border-g30 ">
												Calcelled
											</Text>
										</Pressable>
									</View>
								</View>
							</View>
						</View>
					</View>
				)}
			</ScrollView>

			<Modal visible={showCancelModal} transparent={true}>
				<View
					className="h-full justify-end "
					style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
				>
					<View className="bg-white px-4 pb-8 rounded-t-xl">
						<Text className="text-2xl text-g60 text-center py-4 border-b border-dashed font-semibold border-g30">
							Cancel Order
						</Text>
						<Text className="text-base text-g50 text-center pt-4 pb-8">
							Decline request $250 from Ronald Richards?
						</Text>
						<View className="justify-between items-center flex-row ">
							<Pressable
								onPress={() => setShowCancelModal(false)}
								className="w-[48%] bg-g60 py-3 rounded-lg"
							>
								<Text className="text-center text-white text-base font-semibold">
									No
								</Text>
							</Pressable>
							<Pressable
								onPress={() => {
									router.push("/CancelSuccessfully" as any);
									setShowCancelModal(false);
								}}
								className="w-[48%] border border-g60 py-3  rounded-lg"
							>
								<Text className="text-center text-g60 text-base font-semibold">
									Yes, Cancel
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default MyOrder;

const styles = StyleSheet.create({});
