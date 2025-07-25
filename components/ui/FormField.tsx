import { Pressable, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

type PropsType = {
	isTitle: boolean;
	value: string | number;
	title?: string;
	placeholder: string;
	otherStyle?: string;
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
	required: boolean;
	onChangeText: (text: string) => void;
	error?: string;
};

const FormField = ({
	isTitle,
	value,
	title = "field",
	placeholder,
	otherStyle,
	keyboardType = "default",
	required,
	onChangeText,
	error,
}: PropsType) => {
	const { colorScheme } = useColorScheme();
	const [showPassword, setShowPassword] = useState(false);
	return (
		<View className={`w-full   ${otherStyle}`}>
			<View className="flex-row justify-between">
				{isTitle && (
					<Text className="text-base font-medium text-muted-foreground ">
						{title}
						{required && <Text className="text-red-500">*</Text>}
					</Text>
				)}
				{error && <Text className="text-red-500">{error}</Text>}
			</View>
			<View
				className={`pl-4 pr-8 py-3  border rounded-xl border-border w-full mt-2  bg-g20 border-g30 flex-row justify-between items-center`}
			>
				<TextInput
					value={value?.toString()}
					autoComplete="off"
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor="#4A4A4A"
					className={`w-full focus:outline-none  focus:ring-0  ${error ? "border-red-500" : "border-border"}`}
					secureTextEntry={
						[
							"Password",
							"Old Password",
							"New Password",
							"Confirm Password",
							"New password",
						].includes(title) && !showPassword
					}
					keyboardType={keyboardType}
				/>
				{["Password", "Confirm Password", "New password"].includes(title) && (
					<Pressable onPress={() => setShowPassword((prev) => !prev)}>
						<Ionicons
							name={showPassword ? "eye-outline" : "eye-off-outline"}
							size={16}
							color={colorScheme === "dark" ? "#B6B6B6" : "#4A4A4A"}
						/>
					</Pressable>
				)}
			</View>
		</View>
	);
};

export default FormField;
