import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

type CartItemProps = {
	name: string;
	productImg: any;
	size: string;
	color: string;
	qty: string;
	price: string;
	discountedPrice: string;
	setRemoveModal: React.Dispatch<React.SetStateAction<boolean>>;
	setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartItemCard = ({
	name,
	productImg,
	size,
	color,
	qty,
	price,
	discountedPrice,
	setRemoveModal,
	setEditModal,
}: CartItemProps) => {
	const [cancelModal, setCancelModal] = useState(false);
	return (
		<View className="p-4 rounded-xl border bg-g20 border-g30 mt-4">
			<View className="flex-row justify-start items-center ">
				<View className="rounded-lg overflow-hidden">
					<Image source={productImg} className="w-24 h-32" />
				</View>
				<View className=" pl-4 flex-1">
					<View
						style={{ zIndex: 1 }}
						className="flex-row justify-between items-center"
					>
						<Text className="text-lg font-medium text-g60">{name}</Text>
						<View className=" ">
							<Pressable onPress={() => setCancelModal((prev) => !prev)}>
								<Entypo name="dots-three-vertical" size={14} color="#3f3f3f" />
							</Pressable>

							<View
								className={`absolute top-7 right-0 bg-white py-3 px-4 rounded-md shadow-2 w-[120px]  ${
									cancelModal ? "absolute" : "hidden"
								}`}
							>
								<Pressable
									onPress={() => setEditModal(true)}
									className="flex-row justify-start items-center border-b border-dashed border-g30 pb-2"
								>
									<Text>
										<AntDesign name="edit" size={16} color="#3f3f3f" />
									</Text>
									<Text className="text-sm text-g60 pl-2">Edit Item</Text>
								</Pressable>
								<View className="flex-row justify-start items-center pt-1">
									<Text>
										<MaterialIcons name="delete" size={16} color="#3f3f3f" />
									</Text>
									<Text
										onPress={() => setRemoveModal(true)}
										className="text-sm text-g60 pl-2"
									>
										Remove
									</Text>
								</View>
							</View>
						</View>
					</View>

					<Text className="text-g50 pt-1">Size: {size}</Text>
					<Text className="text-g50 pt-1">Color: {color}</Text>
					<Text className="text-g50 pt-1">Qty: {qty}</Text>
					<View className="flex-row justify-start items-center  pt-2  pb-2">
						<Text className="text-g60 font-semibold pr-2">
							{discountedPrice}
						</Text>
						<Text className="text-g40 line-through font-semibold">{price}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default CartItemCard;

const styles = StyleSheet.create({});
