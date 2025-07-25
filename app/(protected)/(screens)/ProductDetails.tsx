import {
	FlatList,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	AntDesign,
	Entypo,
	FontAwesome,
	MaterialCommunityIcons,
	Octicons,
} from "@expo/vector-icons";
import { availableVouchersData, productReviewData } from "@/constants/data";
import { router } from "expo-router";
import ProductImagesSlider from "@/components/ProductImagesSlider";
import ReviewItem from "@/components/ui/ReviewItem";
import productImg from "@/assets/images/product-img-1.png";

const ProductDetails = () => {
	const [filterSize, setFilterSize] = useState(0);
	const [filterColor, setFilterColor] = useState(0);
	const [isFavourite, setIsFavourite] = useState(false);
	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="pt-6 bg-background min-h-full">
				<View className="flex-row justify-between items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60">Product Details</Text>
					<Pressable className="shareOpenButton">
						<AntDesign name="sharealt" size={24} color="#3f3f3f" />
					</Pressable>
				</View>
				<View className="">
					<ProductImagesSlider />
				</View>
				<View className="px-4 pt-4 bg-background rounded-t-xl pb-24">
					<View className="flex-row justify-between items-center">
						<View className="">
							<Text className="text-xl font-bold text-primary">
								Gildan Mens Classic
							</Text>
							<View className="flex-row justify-start items-center mt-2">
								<View className="flex-row justify-start items-center gap-2">
									<AntDesign name="star" size={16} color="#d9d9d9" />

									<Text className="text-primary font-semibold text-xs">
										4.5 <Text className="font-normal text-g40">(64)</Text>
									</Text>
								</View>
								<View className="leading-none h-1.5 w-1.5 rounded-full bg-g60 mx-2"></View>

								<Text className="text-primary font-semibold text-xs">
									200 <Text className="font-normal text-g40">Sold</Text>
								</Text>
							</View>
						</View>

						<Pressable
							onPress={() => setIsFavourite((prev) => !prev)}
							className="h-8 w-8 border border-g60 rounded-full flex-row justify-center items-center !leading-none cursor-pointer"
						>
							<AntDesign
								name={isFavourite ? "heart" : "hearto"}
								size={16}
								color="#3f3f3f"
							/>
						</Pressable>
					</View>
					<View className="flex-row justify-start items-center pt-4 border-b border-dashed border-g30 pb-4">
						<Text className="text-xl font-semibold text-primary pr-3">
							$120.00
						</Text>
						<Text className="text-xl font-semibold text-primary line-through">
							$140.00
						</Text>
					</View>
					<View className="pt-4">
						<View className="flex-row justify-between items-center pb-4">
							<Text className="text-primary font-semibold text-lg">
								Available Vouchers
							</Text>
							<Pressable onPress={() => router.push("/AvailableVouchers")}>
								<Text className="text-primary text-sm font-semibold">
									View All
								</Text>
							</Pressable>
						</View>
						<View>
							<FlatList
								horizontal
								contentContainerStyle={{ gap: 12 }}
								showsHorizontalScrollIndicator={false}
								data={availableVouchersData}
								keyExtractor={(_, index) => "key" + index}
								renderItem={({ item, index }) => (
									<View className="p-4 rounded-xl bg-card border border-border ">
										<View className="flex-row justify-start items-center gap-3">
											{/* <i className="ph-thin text-xl ph-seal-percent"></i> */}
											<MaterialCommunityIcons
												name="brightness-percent"
												size={20}
												color="#3F3F3F"
											/>
											<Text className="text-sm text-primary font-medium">
												Best Deal: 20% OFF
											</Text>
										</View>
										<View className="flex-row justify-start items-center text-xs text-g50 pt-2">
											<Text className="text-primary pr-2">20DEALS</Text>
											<Octicons name="dot-fill" size={10} color="#696969" />

											<Text className="text-nowrap text-g50 px-2">
												Min spend $150
											</Text>
											<Octicons name="dot-fill" size={10} color="#696969" />

											<Text className="text-nowrap text-g50 pl-2">
												Valid til 12/12/2024
											</Text>
										</View>
									</View>
								)}
							/>
						</View>
					</View>

					<View className=" pt-4">
						<View className="flex-row justify-between items-center">
							<Text className="text-g60 font-semibold text-xl">Size</Text>
						</View>
						<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
							{["XS", "S", "M", "L", "XL"].map((item, idx) => (
								<Pressable
									key={item}
									onPress={() => setFilterSize(idx)}
									className={`w-12 h-9 rounded-md flex-row text-base justify-center items-center ${
										filterSize === idx ? "bg-g60 text-white" : "bg-g20 text-g50"
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

					<View className=" pt-4">
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

					<View className="pt-3 ">
						<Text className="text-g60 font-semibold text-base">
							Product Information
						</Text>
						<View className="justify-start gap-2 flex-col  pt-2">
							<View className="flex-row justify-start items-center">
								<Text className="w-[150px] text-g50">Material</Text>
								<Text className="text-g50">: 100% Acrylic</Text>
							</View>
							<View className="flex-row justify-start items-center">
								<Text className="w-[150px] text-g50">Care Label</Text>
								<Text className="text-g50">: 100% Acrylic</Text>
							</View>
							<View className="flex-row justify-start items-center">
								<Text className="w-[150px] text-g50">SKU</Text>
								<Text className="text-g50">: UBL-SS-S5-C6-245</Text>
							</View>
							<View className="flex-row justify-start items-center">
								<Text className="w-[150px] text-g50">Care Label</Text>
								<Text className="text-g50">: Vary</Text>
							</View>
							<View className="flex-row justify-start items-center">
								<Text className="w-[150px] text-g50">Care Label</Text>
								<Text className="text-g50">: High Neck</Text>
							</View>
							<View className="flex-row justify-start items-center">
								<Text className="w-[150px] text-g50">Pattern</Text>
								<Text className="text-g50">: Solid</Text>
							</View>
						</View>
						<Text className="text-sm text-g50 pt-4">
							Elevate your style with the Urban Blend Long Sleeve Shirt, a
							perfect blend of urban sophistication and contemporary comfort.
							Crafted with meticulous attention to detail, this shirt is
							designed to make a statement in any setting. Anoteer dsedulse.{" "}
							<Text className="text-g60 underline ml-2">Read More</Text>
						</Text>
					</View>

					<View className="pt-6 ">
						<View className="flex-row justify-between items-center pb-4">
							<Text className="text-g60 font-semibold text-lg">
								Rating & Reviews
							</Text>
							<Text
								onPress={() => router.push("/RatingReviews" as any)}
								className="text-g60 text-sm font-semibold"
							>
								View All
							</Text>
						</View>
						<View className="flex-row justify-between items-center pb-3 border-b border-g30">
							<View className="flex flex-col justify-center items-center  border-r border-g30 w-[45%]">
								<Text className="text-3xl font-bold text-g60">4.8</Text>
								<View className="flex-row justify-center items-center  text-g40">
									<FontAwesome name="star" size={16} color="#9d9d9d" />
									<FontAwesome name="star" size={16} color="#9d9d9d" />
									<FontAwesome name="star" size={16} color="#9d9d9d" />
									<FontAwesome name="star" size={16} color="#9d9d9d" />
									<FontAwesome name="star" size={16} color="#9d9d9d" />
								</View>
								<View className="flex-row justify-center items-center  pt-2 ">
									<Text className="text-sm text-g50">563 rating</Text>
									<Text className="w-1 h-1 rounded-full bg-g40 mx-1"></Text>
									<Text className="text-sm text-g50">85 reviews</Text>
								</View>
							</View>
							<View className="w-[55%] pl-4 flex flex-col">
								<View className="flex-row justify-start items-center ">
									<Text className="text-sm font-medium text-g50 ">5</Text>
									<View className="flex-1 h-2 bg-g30 rounded-full ml-4 "></View>
									<View className="absolute left-0 h-2 right-0  bg-g60 after:rounded-full ml-4"></View>
								</View>
								<View className="flex-row justify-start items-center ">
									<Text className="text-sm font-medium text-g50 ">4</Text>
									<View className="flex-1 h-2 bg-g30 rounded-full ml-4 "></View>
									<View className="absolute left-0 h-2 right-10  bg-g60 after:rounded-full ml-4"></View>
								</View>
								<View className="flex-row justify-start items-center ">
									<Text className="text-sm font-medium text-g50 ">3</Text>
									<View className="flex-1 h-2 bg-g30 rounded-full ml-4 "></View>
									<View className="absolute left-0 h-2 right-20  bg-g60 after:rounded-full ml-4"></View>
								</View>
								<View className="flex-row justify-start items-center ">
									<Text className="text-sm font-medium text-g50 ">2</Text>
									<View className="flex-1 h-2 bg-g30 rounded-full ml-4 "></View>
									<View className="absolute left-0 h-2 right-28  bg-g60 after:rounded-full ml-4"></View>
								</View>
								<View className="flex-row justify-start items-center ">
									<Text className="text-sm font-medium text-g50 ">1</Text>
									<View className="flex-1 h-2 bg-g30 rounded-full ml-4 "></View>
									<View className="absolute left-0 h-2 right-40  bg-g60 after:rounded-full ml-4"></View>
								</View>
							</View>
						</View>
					</View>

					<View className="flex flex-col pb-8">
						{productReviewData.slice(0, 2).map(({ id, ...props }) => (
							<ReviewItem islikeSection={false} key={`${id}`} {...props} />
						))}
					</View>
				</View>
			</ScrollView>

			<View className="absolute bottom-0 left-0 right-0 bg-white py-4">
				<View className="px-4 pt-4 justify-between items-center flex-row ">
					<Pressable
						onPress={() => router.push("/Checkout")}
						className="w-[48%] bg-g60 py-3 rounded-lg"
					>
						<Text className="text-center text-white text-base font-semibold">
							Buy Now
						</Text>
					</Pressable>
					<Pressable className="w-[48%] border border-g60 py-3  rounded-lg">
						<Text className="text-center text-g60 text-base font-semibold">
							Add to Cart
						</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ProductDetails;

const styles = StyleSheet.create({});
