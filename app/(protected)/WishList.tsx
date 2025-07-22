import {
	FlatList,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductItem from "@/components/ui/ProductItem";
import { productCategory, productItems } from "@/constants/data";
import { router } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";

const WishList = () => {
	const [activeProductCategory, setActiveProductCategory] = useState(0);
	return (
		<SafeAreaView
			className={`${Platform.OS === "web" && "max-w-[800px] mx-auto"} flex-1`}
		>
			<ScrollView className="pt-8 bg-white">
				<View className="flex-row justify-start items-center gap-4 px-4 w-full ">
					<Pressable onPress={() => router.back()} className="">
						<Entypo name="chevron-with-circle-left" size={32} color="#3f3f3f" />
					</Pressable>
					<Text className="text-2xl font-bold text-g60">Wishlist</Text>
				</View>
				{/* Product Category Slider Start */}
				<View className="pt-6 pl-4  justify-start items-start">
					<FlatList
						horizontal
						contentContainerStyle={{ gap: 12 }}
						showsHorizontalScrollIndicator={false}
						data={productCategory}
						keyExtractor={(_, index) => "key" + index}
						renderItem={({ item, index }) => (
							<Pressable
								onPress={() => setActiveProductCategory(index)}
								className={`${
									productCategory.length === index + 1 ? "pr-6" : ""
								}`}
							>
								<View
									className={` px-5 py-2 justify-center items-center rounded-md  ${
										activeProductCategory === index ? "bg-g60" : "bg-g30"
									} `}
								>
									<Text
										className={`text-base font-medium  ${
											index === activeProductCategory
												? "text-white"
												: "text-g50 "
										} `}
									>
										{item}
									</Text>
								</View>
							</Pressable>
						)}
					/>
				</View>
				{/* Product Category Slider End */}

				{/* Products List Start */}
				<View className="px-4 flex flex-wrap flex-row justify-between pb-10">
					{productItems.slice(0, 6).map(({ id, ...props }) => (
						<ProductItem isFavourite={true} key={`${id}`} {...props} />
					))}
				</View>
				{/* Products List End */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default WishList;

const styles = StyleSheet.create({});
