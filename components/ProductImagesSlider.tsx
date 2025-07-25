import {
	FlatList,
	Image,
	Text,
	useWindowDimensions,
	View,
	ViewToken,
} from "react-native";
import React, { useCallback } from "react";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import productImg from "@/assets/images/product-img.png";
// import Pagination from "./ui/Pagination";

type ItemProps = {
	id: number;
	title: string;
	desc: string;
	img: any;
};

const ProductImagesSlider = () => {
	const flatListRef = useAnimatedRef<FlatList<ItemProps>>();
	const x = useSharedValue(0);
	const flatListIndex = useSharedValue(0);

	const onViewableItemsChanged = useCallback(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			if (
				viewableItems &&
				viewableItems.length > 0 &&
				viewableItems[0]?.index !== null
			) {
				flatListIndex.value = viewableItems[0].index;
			}
		},
		[],
	);

	const onScroll = useAnimatedScrollHandler({
		onScroll: (event) => {
			x.value = event.contentOffset.x;
		},
	});
	const { width: SCREEN_WIDTH } = useWindowDimensions();

	const productSliderImg = [
		{
			id: 1,
			img: productImg,
		},
		{
			id: 2,
			img: productImg,
		},
		{
			id: 3,
			img: productImg,
		},
	];

	return (
		<View className="bg-g20">
			<Animated.FlatList
				ref={flatListRef}
				data={productSliderImg}
				onScroll={onScroll}
				keyExtractor={(item, idx) => `key:${item.id}`}
				renderItem={({ item, index }) => {
					return (
						<View
							className=" justify-center items-center"
							style={{ width: SCREEN_WIDTH * 0.9, margin: SCREEN_WIDTH * 0.05 }}
						>
							<Image source={item.img} />
						</View>
					);
				}}
				scrollEventThrottle={16}
				horizontal={true}
				bounces={false}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={{
					minimumViewTime: 300,
					viewAreaCoveragePercentThreshold: 10,
				}}
			/>
			<View className="pb-6 ">
				{/* <Pagination onbordingSliderData={productSliderImg} x={x} /> */}
			</View>
		</View>
	);
};

export default ProductImagesSlider;
