import {
	FlatList,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	filterBrandCategory,
	filterProductCategory,
	productCategory,
	productItems,
} from "@/constants/data";
import ProductItem from "@/components/ui/ProductItem";
import { router } from "expo-router";
import {
	AntDesign,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";

const sortOptions = [
	"Most Suitable",
	"Popularity",
	"Top Rated",
	"Price High to Low",
	"Price Low to High",
	"Latest Arrival",
	"Discount",
];

const AllProducts = () => {
	const [activeProductCategory, setActiveProductCategory] = useState(0);
	const [sortModal, setSortModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);
	const [activeSortOption, setActiveSortOption] = useState(0);
	const [filterCategory, setFiterCategory] = useState(0);
	const [filterBrand, setFilterBrand] = useState(0);
	const [filterPrice, setFilterPrice] = useState(0);
	const [filterRating, setFilterRating] = useState(0);
	const [filterSize, setFilterSize] = useState(0);
	const [filterColor, setFilterColor] = useState(0);
	return (
		<SafeAreaView className="flex-1">
			<ScrollView className="pt-8">
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
						<ProductItem key={`${id}`} {...props} />
					))}
				</View>
				{/* Products List End */}
			</ScrollView>
			{/* Filter Sort Button Start */}
			<View
				className="fixed bottom-24 left-0 right-0 flex justify-center items-center "
				style={{ zIndex: 1 }}
			>
				<View className="flex-row justify-center items-center py-2 px-4 bg-white rounded-lg shadow-2">
					<Pressable
						onPress={() => setSortModal(true)}
						className="flex-row justify-center items-center border-r border-g30 pr-3 sortModalButton cursor-pointer"
					>
						<MaterialIcons name="sort" size={14} color="black" />
						<Text className="text-g60 text-sm font-medium pl-1">Sort</Text>
					</Pressable>
					<Pressable
						onPress={() => setFilterModal(true)}
						className="flex-row justify-center items-center cursor-pointer filterModalButton pl-4"
					>
						<MaterialCommunityIcons
							name="filter-outline"
							size={14}
							color="black"
						/>
						<Text className="text-g60 text-sm font-medium pl-1">Filter</Text>
					</Pressable>
				</View>
			</View>

			{/* Filter Sort Button End */}
			<Modal visible={sortModal} transparent={true}>
				<View
					className="h-full justify-end"
					style={{ backgroundColor: "rgba(52, 52, 52, 0.5)" }}
				>
					<View className="px-4 pt-2 pb-6 rounded-t-2xl bg-white w-full">
						<View className="flex justify-center items-center flex-col border-b border-dashed border-g30">
							<View className="w-14 h-1 bg-g30 rounded-lg"></View>
							<View className="flex-row justify-between gap-4 items-center w-full py-4">
								<Text className="text-2xl text-g60 font-semibold">Sort</Text>
								<Pressable className="" onPress={() => setSortModal(false)}>
									<AntDesign name="closecircleo" size={28} color="#3f3f3f" />
								</Pressable>
							</View>
						</View>
						<View className=" flex flex-col pt-2">
							{sortOptions.map((item, idx) => (
								<Pressable
									onPress={() => setActiveSortOption(idx)}
									key={item}
									className=" flex-row justify-start items-center gap-2 py-1.5 "
								>
									<MaterialCommunityIcons
										name={
											activeSortOption === idx
												? "radiobox-marked"
												: "radiobox-blank"
										}
										size={16}
										color="#696969"
									/>
									<Text className="text-g50 font-medium">{item}</Text>
								</Pressable>
							))}
						</View>

						<View className="w-full">
							<Pressable
								onPress={() => setSortModal(false)}
								className="bg-g60  w-full  rounded-md mt-6"
							>
								<Text className="text-white text-center py-2 text-base">
									Save
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			<Modal visible={filterModal}>
				<ScrollView>
					<View className="pt-6 pb-6 bg-white">
						<View className="flex-row justify-between gap-4 items-center px-4">
							<Text className="text-2xl text-g60 font-semibold">Filter</Text>
							<Pressable className="" onPress={() => setFilterModal(false)}>
								<AntDesign name="closecircleo" size={28} color="#3f3f3f" />
							</Pressable>
						</View>

						<View className="px-4 pt-8">
							<View className="flex-row justify-between items-center">
								<Text className="text-g60 font-semibold text-xl">
									Categories
								</Text>
								<Pressable>
									<Text className="text-g60 text-sm font-semibold">
										View All
									</Text>
								</Pressable>
							</View>
							<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
								{filterProductCategory.map((item, idx) => (
									<Text
										key={item}
										onPress={() => setFiterCategory(idx)}
										className={`py-2 px-3 rounded-md text-base ${
											filterCategory === idx
												? "bg-g60 text-white"
												: "bg-g20 text-g50"
										}`}
									>
										{item}
									</Text>
								))}
							</View>
						</View>

						<View className="px-4 pt-4">
							<View className="flex-row justify-between items-center">
								<Text className="text-g60 font-semibold text-xl">Brand</Text>
							</View>
							<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
								{filterBrandCategory.map((item, idx) => (
									<Text
										key={item}
										onPress={() => setFilterBrand(idx)}
										className={`py-2 px-3 rounded-md text-base ${
											filterBrand === idx
												? "bg-g60 text-white"
												: "bg-g20 text-g50"
										}`}
									>
										{item}
									</Text>
								))}
							</View>
						</View>

						<View className="px-4 pt-4">
							<View className="flex-row justify-between items-center">
								<Text className="text-g60 font-semibold text-xl">Price</Text>
							</View>
							<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
								{[
									"$1-$50",
									"$51-$100",
									"$101-$150",
									"$151-$200",
									"$201-$250",
									"$251-$300",
								].map((item, idx) => (
									<Text
										key={item}
										onPress={() => setFilterPrice(idx)}
										className={`py-2 px-3 rounded-md text-base ${
											filterPrice === idx
												? "bg-g60 text-white"
												: "bg-g20 text-g50"
										}`}
									>
										{item}
									</Text>
								))}
							</View>
						</View>

						<View className="px-4 pt-4">
							<View className="flex-row justify-between items-center">
								<Text className="text-g60 font-semibold text-xl">Rating</Text>
							</View>
							<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
								{[
									"1.0",
									"1.5",
									"2.0",
									"2.5",
									"3.0",
									"3.5",
									"4.0",
									"4.5",
									"5.0",
								].map((item, idx) => (
									<Pressable
										key={item}
										onPress={() => setFilterSize(idx)}
										className={`py-2 px-3 rounded-md flex-row text-base justify-center items-center ${
											filterSize === idx
												? "bg-g60 text-white"
												: "bg-g20 text-g50"
										}`}
									>
										<Text className="mr-2">
											<AntDesign
												name={filterSize === idx ? "star" : "staro"}
												size={16}
												color={filterSize === idx ? "white" : "#696969"}
											/>
										</Text>
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

						<View className="px-4 pt-4">
							<View className="flex-row justify-between items-center">
								<Text className="text-g60 font-semibold text-xl">Size</Text>
							</View>
							<View className="flex-row justify-start items-center flex-wrap text-base font-medium gap-3 pb-2 horizontal-slide pt-3 productCategoryList filterProductCategory">
								{[
									"XXS",
									"XS",
									"S",
									"M",
									"L",
									"XL",
									"35",
									"36",
									"37",
									"38",
									"39",
									"40",
									"41",
									"42",
									"43",
								].map((item, idx) => (
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

						<View className="px-4 pt-4">
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

						<View className="px-4 pt-4 justify-between items-center flex-row">
							<Pressable className="w-[48%] bg-g60 py-3 rounded-lg">
								<Text className="text-center text-white text-base font-semibold">
									Apply
								</Text>
							</Pressable>
							<Pressable className="w-[48%] border border-g60 py-3  rounded-lg">
								<Text className="text-center text-g60 text-base font-semibold">
									Reset
								</Text>
							</Pressable>
						</View>
					</View>
				</ScrollView>
			</Modal>
		</SafeAreaView>
	);
};

export default AllProducts;

const styles = StyleSheet.create({});
