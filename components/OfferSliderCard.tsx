import { FlatList, View, ViewToken } from "react-native";
import React, { useCallback } from "react";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { offerSlider } from "@/constants/data";
import OfferSliderCardSliderItem from "./ui/OfferSliderCardSliderItem";

type ItemProps = {
	id: number;
	title: string;
	desc: string;
	img: any;
};

const OfferSliderCard = () => {
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
	return (
		<View className="">
			<Animated.FlatList
				ref={flatListRef}
				data={offerSlider}
				onScroll={onScroll}
				keyExtractor={(item) => `key:${item.id}`}
				renderItem={({ item, index }) => {
					return (
						<OfferSliderCardSliderItem
							img={item.img}
							offer={item.offer}
							offerDesc={item.offerDesc}
							bgColor={item.bgColor}
						/>
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
		</View>
	);
};

export default OfferSliderCard;
