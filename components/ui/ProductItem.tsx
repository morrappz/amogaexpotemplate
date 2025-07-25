import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

type ProductItemProps = {
	name: string;
	productImg: any;
	rating: string;
	noOfRating: string;
	noOfSold: string;
	price: string;
	discountedPrice: string;
	isFavourite?: boolean;
};

const ProductItem = ({
	name,
	productImg,
	rating,
	noOfRating,
	noOfSold,
	price,
	discountedPrice,
	isFavourite,
}: ProductItemProps) => {
	return (
		<Pressable
			onPress={() => router.push("/ProductDetails" as any)}
			className="pt-4 bg-gradient relative w-[48%]"
		>
			<View className="rounded-xl relative overflow-hidden block">
				<Image source={productImg} className="w-full" alt="" />
			</View>
			<View className="absolute top-7 right-3 shadow-1 bg-gradient p-1.5 rounded-full flex justify-center items-center cursor-pointer favouriteButton">
				<FontAwesome
					name={isFavourite ? "heart" : "heart-o"}
					size={14}
					color="#3F3F3F"
				/>
			</View>
			<View className="pt-1">
				<Text className="text-g60 text-base font-semibold">{name}</Text>
				<View className="flex flex-row justify-start items-center">
					<View className="flex-row justify-start items-center">
						<FontAwesome name="star" size={12} color="#D9D9D9" />
						<Text className="text-g60 font-semibold text-xs px-1">
							{rating}{" "}
							<Text className="font-normal text-g40">({noOfRating})</Text>
						</Text>
					</View>
					<Entypo name="dot-single" size={24} color="#D9D9D9" />
					<Text className="text-g60 font-semibold text-xs">
						{noOfSold} <Text className="font-normal text-g40">Sold</Text>
					</Text>
				</View>
			</View>
			<View className="flex-row">
				<Text className="text-g60 font-semibold text-sm pr-2">${price}.00</Text>
				<Text className="font-normal text-g40 line-through">
					${discountedPrice}.00
				</Text>
			</View>
		</Pressable>
	);
};

export default ProductItem;

const styles = StyleSheet.create({});
