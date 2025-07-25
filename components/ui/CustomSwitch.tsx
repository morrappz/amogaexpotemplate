import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const CustomSwitch = () => {
	const [active, setActive] = useState(false);
	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => setActive((prev) => !prev)}
			className="relative w-12"
		>
			<Text
				className={`h-6 w-[46px] ${active ? "bg-primary" : "bg-secondary"} rounded-full`}
			></Text>
			<Text
				className={`absolute top-0.5  h-5 w-5 rounded-full bg-card duration-700 z-10 ${
					active ? "left-6" : " left-0.5"
				}`}
			></Text>
		</TouchableOpacity>
	);
};

export default CustomSwitch;
