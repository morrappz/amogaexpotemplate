import {
	Image,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import porductImg from "@/assets/images/product-img-1.png";
import { cartData } from "@/constants/data";
import CartItemCard from "@/components/ui/CartItemCard";

const Cart = () => {
	const [removeModal, setRemoveModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [filterSize, setFilterSize] = useState(0);
	const [filterColor, setFilterColor] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			setRemoveModal(false);
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [removeModal]);

	return (
		<SafeAreaView
			className={`${
				Platform.OS === "web" && "max-w-[800px] mx-auto"
			} w-full flex-1`}
		>
			<ScrollView className="pt-6 min-h-full bg-white ">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60">Cart (4)</Text>
				</View>

				<View className="pt-4 px-6 pb-32">
					<View className="flex flex-col">
						{cartData.map(({ id, ...props }) => (
							<CartItemCard
								key={`${id}`}
								{...props}
								setEditModal={setEditModal}
								setRemoveModal={setRemoveModal}
							/>
						))}
					</View>
				</View>
			</ScrollView>

			<View className="absolute bottom-0 left-0 right-0 bg-white py-4 px-4">
				<Pressable
					onPress={() => router.push("/Checkout" as any)}
					className=" bg-g60 py-3 rounded-lg"
				>
					<Text className="text-center text-white text-base font-semibold">
						Checkout (5)-$445.00
					</Text>
				</Pressable>
			</View>

			<Modal visible={editModal} transparent={true}>
				<View
					className="h-full justify-end "
					style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
				>
					<View className="bg-white pb-6 pt-3 rounded-t-xl">
						<View className="flex justify-center items-center flex-col border-b border-dashed border-g30 mx-4">
							<View className="w-14 h-1 bg-g30 rounded-lg"></View>
							<Text className="text-xl font-semibold text-g60 text-center py-3">
								Edit Product Variant
							</Text>
						</View>

						<View className="pt-2">
							<View className="flex flex-col  pt-4 px-4">
								<View className="p-4 rounded-xl border border-g30 flex-row justify-start items-center ">
									<View className="rounded-lg overflow-hidden">
										<Image source={porductImg} className="w-28 h-32" />
									</View>
									<View className=" pl-4">
										<Text className="text-base font-medium text-g60">
											Estelle Novelty Crossbody
										</Text>
										<Text className="text-g50 text-sm pt-1">Stock : 160</Text>

										<View className="flex-row justify-start items-center pt-2 text-sm pb-2">
											<Text className="text-g60 font-semibold pr-2 text-lg">
												$116.00
											</Text>
											<Text className="text-g40 line-through font-semibold text-lg">
												$156.00
											</Text>
										</View>
										<View className="border border-g30 bg-g30 bg-opacity-40 px-3 flex-row justify-start items-center rounded-md text-sm w-[90px]">
											<Text className="pr-2">
												<AntDesign name="plus" size={16} color="black" />
											</Text>
											<TextInput value="1" />

											<Text>
												<AntDesign name="minus" size={16} color="black" />
											</Text>
										</View>
									</View>
								</View>
							</View>
						</View>

						<View className=" pt-4 px-4">
							<View className="flex-row justify-between items-center">
								<Text className="text-g60 font-semibold text-xl">Size</Text>
							</View>
							<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
								{["XS", "S", "M", "L", "XL"].map((item, idx) => (
									<Pressable
										key={item}
										onPress={() => setFilterSize(idx)}
										className={`w-12 h-9 rounded-md flex-row text-base justify-center items-center ${
											filterSize === idx
												? "bg-g60 text-white"
												: "bg-g20 text-g50"
										}`}
									>
										<Text
											className={`text-base ${
												filterSize === idx ? " text-white" : "text-g50"
											}`}
										>
											{item}
										</Text>
									</Pressable>
								))}
							</View>
						</View>

						<View className=" px-4">
							<View className="flex-row justify-between items-center">
								<Text className="text-g60 font-semibold text-xl">Colors</Text>
							</View>
							<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
								{[
									"bg-g60",
									"bg-green-500",
									"bg-red-400",
									"bg-yellow-500",
									"bg-sky-500",
								].map((item, idx) => (
									<Pressable
										key={item}
										onPress={() => setFilterColor(idx)}
										className={`border p-0.5 rounded-md  ${
											filterColor === idx ? "border-g60" : "border-transparent"
										}`}
									>
										<View
											className={`w-12 h-8 rounded-md  text-white ${item}`}
										></View>
									</Pressable>
								))}
							</View>
						</View>

						<View className="px-4 pt-4 justify-between items-center flex-row ">
							<Pressable
								onPress={() => setEditModal(false)}
								className="w-[48%] bg-g60 py-3 rounded-lg"
							>
								<Text className="text-center text-white text-base font-semibold">
									Confirm
								</Text>
							</Pressable>
							<Pressable
								onPress={() => setEditModal(false)}
								className="w-[48%] border border-g60 py-3  rounded-lg"
							>
								<Text className="text-center text-g60 text-base font-semibold">
									Cancel
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			<Modal visible={removeModal} transparent={true}>
				<View className="h-full justify-start items-end ">
					<View className="flex-row justify-center items-center bg-white py-1 px-3 rounded-lg mt-6 mr-4">
						<View className="">
							<Ionicons
								name="checkmark-circle-sharp"
								size={32}
								color="#3f3f3f"
							/>
						</View>
						<Text className=" text-g60 pl-1">Removed from Cart!</Text>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

export default Cart;

const styles = StyleSheet.create({});
