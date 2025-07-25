import { View } from "react-native";
import React from "react";

const RadioButton = ({ isActive }: { isActive: boolean }) => {
	return (
		<View
			className={`border  w-5 h-5 rounded-full justify-center items-center ${
				isActive ? "border-g60" : " border-g60"
			}`}
		>
			<View
				className={`w-3 h-3 border  rounded-full ${
					isActive ? "border-g60 bg-g60" : "border-g60 "
				} `}
			></View>
		</View>
	);
};

export default RadioButton;
