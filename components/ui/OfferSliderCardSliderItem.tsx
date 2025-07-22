import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import React from "react";

type OfferSliderProps = {
	img: any;
	offer: string;
	offerDesc: string;
	bgColor: string;
};

const OfferSliderCardSliderItem = ({
	img,
	offer,
	offerDesc,
	bgColor,
}: OfferSliderProps) => {
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	return (
		<View
			className="flex flex-row justify-between items-center rounded-xl bg-g30"
			style={{ width: SCREEN_WIDTH * 0.9, margin: SCREEN_WIDTH * 0.05 }}
		>
			<View className="pl-6 pr-8">
				<Text className="text-3xl font-bold text-g60">{offer}</Text>
				<Text className="text-base text-g50 pb-5">{offerDesc}</Text>
				<Pressable className=" ">
					<Text className="text-sm font-semibold text-white bg-g60 rounded-lg py-2 text-center">
						Get Now
					</Text>
				</Pressable>
			</View>
			<View className="pr-4">
				<Image source={img} />
			</View>
		</View>
	);
};

export default OfferSliderCardSliderItem;

const styles = StyleSheet.create({});
