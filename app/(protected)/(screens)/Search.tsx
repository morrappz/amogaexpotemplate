import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import { productItems } from "@/constants/data";
import ProductItem from "@/components/ui/ProductItem";
import { Input } from "@/components/ui/input";

const popolarSearch = ["Hoodie for Men", "Nike", "Polo Shirt", "Adidas Shoes"];

const Search = () => {
	const [value, setValue] = useState("");
	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="bg-background">
				{/* Search Section Start */}
				<Pressable
					onPress={() => router.push("/Search" as any)}
					className="pt-6 px-4 flex-row justify-between items-center"
				>
					<View className="w-[83%] border border-primary px-4  rounded-xl">
						<View className="flex-row justify-between items-center">
							<View className="flex-row justify-start items-center">
								<AntDesign name="search1" size={16} color="#696969" />
								<Input
									value={value}
									onChangeText={(e) => setValue(e)}
									placeholder="Search Here"
									className="w-full"
								/>
							</View>
							<Pressable onPress={() => router.push("/CameraViewPage" as any)}>
								<Feather name="camera" size={16} color="#696969" />
							</Pressable>
						</View>
					</View>
					<View className="flex-1 bg-g60 justify-center items-center ml-3 py-4 rounded-xl">
						<AntDesign name="search1" size={20} color="white" />
					</View>
				</Pressable>
				{/* Search Section End */}

				<View className="px-4 pt-6">
					<Text className="text-base text-primary font-semibold text-g60 border-b border-dashed border-g30 pb-2">
						Popular Search
					</Text>

					<View>
						{popolarSearch.map((item, idx) => (
							<View
								key={item}
								className="flex-row justify-between items-center"
							>
								<Text className="text-base pt-4 text-primary">{item}</Text>
								<Feather name="chevron-right" size={20} color="#3f3f3f" />
							</View>
						))}
					</View>
				</View>

				<View className="px-4 pt-6 flex-row justify-between items-center">
					<Text className="text-base font-semibold text-primary ">
						Hot Deals This Week
					</Text>
					<Text
						onPress={() => router.push("/AllProducts" as any)}
						className="text-xs font-semibold text-primary "
					>
						View All
					</Text>
				</View>

				{/* Products List Start */}
				<View className="px-4 flex flex-wrap flex-row justify-between pb-10">
					{productItems.slice(2, 4).map(({ id, ...props }) => (
						<ProductItem key={`${id}`} {...props} />
					))}
				</View>
				{/* Products List End */}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Search;

const styles = StyleSheet.create({});
