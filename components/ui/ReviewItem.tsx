import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import {
	AntDesign,
	FontAwesome,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import reviewerImg from "@/assets/images/reviewer-1.png";
import reviewImg1 from "@/assets/images/review-img-1.png";
import reviewImg2 from "@/assets/images/review-img-2.png";
import reviewImg3 from "@/assets/images/review-img-3.png";

type ReviewProps = {
	name: string;
	userImg: any;
	reviewTime: string;
	ratingStar: string;
	review: string;
	reviewimages: any[];
	likeCount: string;
	dislikeCount: string;
	islikeSection: boolean;
};

const ReviewItem = ({
	name,
	userImg,
	reviewTime,
	ratingStar,
	review,
	reviewimages,
	likeCount,
	dislikeCount,
	islikeSection,
}: ReviewProps) => {
	const [reportModal, setReportModal] = useState(false);
	return (
		<View className="border border-g30 p-4 rounded-xl mt-4">
			<View className="flex-row justify-between items-start">
				<View className="flex-row justify-start items-center gap-3">
					<Image source={userImg} className="rounded-full" />
					<View className="">
						<Text className="text-sm font-semibold text-g60">{name}</Text>
						<Text className="text-xs font-semibold text-g40">{reviewTime}</Text>
					</View>
				</View>
				<View className="relative">
					<Pressable
						onPress={() => setReportModal((prev) => !prev)}
						className=""
					>
						<MaterialCommunityIcons
							name="dots-vertical"
							size={20}
							color="#3f3f3f"
						/>
					</Pressable>

					<Text
						className={`text-xs text-white  top-7 right-0  py-3 px-4 rounded-md   w-[120px]  duration-500 bg-g50 ${
							reportModal ? "absolute" : "hidden"
						}`}
					>
						Report Abuse
					</Text>
				</View>
			</View>
			<View className="flex-row justify-start items-center pt-2 gap-3">
				<View className="flex-row justify-center items-center  text-g40">
					<FontAwesome name="star" size={12} color="#9d9d9d" />
					<FontAwesome name="star" size={12} color="#9d9d9d" />
					<FontAwesome name="star" size={12} color="#9d9d9d" />
					<FontAwesome name="star" size={12} color="#9d9d9d" />
					<FontAwesome name="star" size={12} color="#9d9d9d" />
				</View>
				<Text className="text-xs font-semibold text-g40">
					{ratingStar} Star
				</Text>
			</View>
			<Text className="text-sm pt-3 text-g50">{review}</Text>
			<View className="flex-row justify-start items-center gap-2 pt-2">
				{reviewimages.map((item, idx) => (
					<Image key={item} source={item} className="rounded-md" />
				))}
			</View>
			{islikeSection && (
				<View className="flex-row justify-between items-center pt-3">
					<Text className="text-g50">Colour Family : Black</Text>
					<View className="flex-row justify-start items-center">
						<View className="flex-row justify-start items-center">
							<AntDesign name="like1" size={14} color="#696969" />
							<Text className="text-g60 pl-1">{likeCount}</Text>
						</View>
						<View className="flex-row justify-start items-center pl-2">
							<AntDesign name="dislike1" size={14} color="#696969" />
							<Text className="text-g60 pl-1">{dislikeCount}</Text>
						</View>
					</View>
				</View>
			)}
		</View>
	);
};

export default ReviewItem;
