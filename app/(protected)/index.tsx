import {
	FlatList,
	Image,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
	AntDesign,
	FontAwesome,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import OfferSliderCard from "@/components/OfferSliderCard";
import { productCategory, productItems } from "@/constants/data";
import ProductItem from "@/components/ui/ProductItem";
import { router } from "expo-router";
import { useAuth } from "@/context/supabase-provider";
import { useAppTheme } from "@/themes/useTheme";

const HomePage = () => {
	const [activeProductCategory, setActiveProductCategory] = useState(0);
	const { session } = useAuth();
	const { theme } = useAppTheme();
	const isGradient = theme.includes("gradient");
	console.log("theme-------", theme);

	return (
		<SafeAreaView className={`flex-1 ${theme}`}>
			<ScrollView
				className={`pb-6 pt-6 ${isGradient ? "bg-background" : "bg-background"} `}
			>
				<View className="px-4 flex-row w-full justify-between items-center">
					<Text className="text-3xl font-semibold text-primary">ClickMart</Text>
					<MaterialCommunityIcons
						name="bell-badge"
						size={28}
						className="text-primary"
					/>
				</View>
				{/* Search Section Start */}
				<Pressable
					onPress={() => router.push("/Search" as any)}
					className="pt-6 px-4 flex-row justify-between items-center"
				>
					<View className="w-[83%] border border-g30 p-4 rounded-xl">
						<View className="flex-row justify-start items-center">
							<AntDesign name="search1" size={16} color="#696969" />
							<Text className="text-g50 pl-2">Search Here</Text>
						</View>
					</View>
					<View className="flex-1 bg-g60 justify-center items-center ml-3 py-4 rounded-xl">
						<AntDesign name="search1" size={20} color="white" />
					</View>
				</Pressable>
				{/* Search Section End */}

				{/* Offer Slider Start */}
				<OfferSliderCard />
				{/* Offer Slider End */}

				{/* Product Category Slider Start */}
				<View className="pt-2 pl-4  justify-start items-start">
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
										className={`text-base bg-primary p-2.5 rounded-md font-medium  ${
											index === activeProductCategory
												? "text-white"
												: "text-muted "
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

				<View className="px-4 pt-6 flex-row justify-between items-center">
					<Text className="text-base font-semibold text-g60 ">
						Most Popular
					</Text>
					<Text
						onPress={() => router.push("/AllProducts" as any)}
						className="text-xs font-semibold text-g60 "
					>
						View All
					</Text>
				</View>

				{/* Products List Start */}
				<View className="px-4 flex flex-wrap flex-row justify-between pb-10">
					{productItems.slice(0, 6).map(({ id, ...props }) => (
						<ProductItem key={`${id}`} {...props} />
					))}
				</View>
				{/* Products List End */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomePage;

const styles = StyleSheet.create({});
