import { View, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./elements/Text";
import { useHeader } from "@/context/header-context";
import { Pressable } from "react-native";
import { useAuth } from "@/context/supabase-provider";
import { useRouter } from "expo-router";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./elements/DropdownMenu";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LucideIcon from "./LucideIcon";
import Animated, { FadeIn } from "react-native-reanimated";
import { BellIcon } from "lucide-react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./elements/Avatar";
import { Palette } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Language from "./Language";

export function Header() {
	const router = useRouter();
	const { title, showBack, show } = useHeader();
	const { userCatalog, signOut } = useAuth();

	console.log("usercataloig------", userCatalog);

	// Ensure names are strings and encode for URL
	const firstName = (userCatalog?.first_name || "T").toString();
	const lastName = (userCatalog?.last_name || "l").toString();
	const avatarUrl = `https://ui-avatars.com/api/?name=k${encodeURIComponent(firstName)}+${encodeURIComponent(lastName)}&background=0D8ABC&color=fff`;
	const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
	const [imageError, setImageError] = React.useState(false);

	const triggerRef =
		React.useRef<React.ElementRef<typeof DropdownMenuTrigger>>(null);
	const insets = useSafeAreaInsets();
	const contentInsets = {
		top: insets.top,
		bottom: insets.bottom,
		left: 12,
		right: 12,
	};

	if (!show) {
		return <></>;
	}

	return (
		<View className="flex-row items-center justify-between px-4 pt-4 pb-4 bg-background">
			<View className="flex-row items-center gap-x-2">
				{showBack && (
					<Pressable
						onPress={() => {
							/* TODO: navigation.goBack() */
						}}
						className="flex mr-1"
					>
						<Text className="flex">
							<MaterialIcons name="arrow-back" size={24} />
						</Text>
					</Pressable>
				)}
				{imageError ? (
					<View
						style={{
							width: 36,
							height: 36,
							borderRadius: 18,
							backgroundColor: "#0D8ABC",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
							{initials}
						</Text>
					</View>
				) : (
					<Image
						source={{ uri: avatarUrl }}
						style={{ width: 36, height: 36, borderRadius: 18 }}
						onError={() => setImageError(true)}
					/>
				)}
				<View>
					<Text className="font-semibold text-md"></Text>
					{/* <Text className="text-xs text-green-400">Online</Text> */}
				</View>
			</View>
			<View className="flex-row items-center gap-x-4 max-h-7">
				<Pressable onPress={() => router.push("/(protected)/notifications")}>
					<Text>
						{" "}
						<LucideIcon name="Bell" size={24} className="text-primary" />{" "}
					</Text>
				</Pressable>{" "}
				<ThemeToggle />
				<Language />
				{/* <Pressable
                    className="absolute top-0 right-0 active:bg-primary/5"
                    onPress={() => {
                        triggerRef.current?.open();
                    }}
                /> */}
				<DropdownMenu>
					<DropdownMenuTrigger ref={triggerRef} asChild>
						<Text className="mb-1 size-7">
							<LucideIcon
								name="Menu"
								size={24}
								className="mb-1 size-7 text-primary"
							/>
						</Text>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						insets={contentInsets}
						className="w-64 native:w-72"
					>
						<DropdownMenuLabel className="p-1 font-normal">
							<View className="flex flex-row items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar
									className="h-8 w-8 rounded-lg"
									alt={userCatalog?.username}
								>
									<AvatarImage src={userCatalog?.image_url} />
									<AvatarFallback className="rounded-lg">
										<Text>{initials}</Text>
									</AvatarFallback>
								</Avatar>
								<View className="grid flex-1 text-left text-sm leading-tight">
									<View className="truncate font-semibold">
										<Text>
											{userCatalog?.first_name} {userCatalog?.last_name}
										</Text>
									</View>
									<View className="truncate text-xs">
										<Text>{userCatalog?.user_email}</Text>
									</View>
								</View>
							</View>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onPress={() => router.push("/(protected)")}>
							{/* <Text>
								<LucideIcon name="User" size={14} />
							</Text> */}
							<Text>Home</Text>
						</DropdownMenuItem>
						<DropdownMenuItem
							onPress={() => router.push("/(protected)/WishList")}
						>
							{/* <Text>
								<LucideIcon name="Users" size={14} />
							</Text> */}
							<Text>Wishlist</Text>
						</DropdownMenuItem>
						<DropdownMenuItem
							onPress={() => router.push("/(protected)/MyOrder")}
						>
							{/* <Text>
								<LucideIcon name="Users" size={14} />
							</Text> */}
							<Text>My Orders</Text>
						</DropdownMenuItem>
						<DropdownMenuItem onPress={() => router.push("/(protected)/Cart")}>
							{/* <Text>
								<LucideIcon name="Package" size={14} />
							</Text> */}
							<Text>Cart</Text>
						</DropdownMenuItem>
						<DropdownMenuItem
							onPress={() => router.push("/(protected)/Profile")}
						>
							{/* <Text>
								<LucideIcon name="PackagePlus" size={14} />
							</Text> */}
							<Text>Settings</Text>
						</DropdownMenuItem>
						<DropdownMenuItem
							onPress={() => router.push("/(protected)/HelpCenter")}
						>
							{/* <Text>
								<LucideIcon name="Settings" size={14} />
							</Text> */}
							<Text>Help center</Text>
						</DropdownMenuItem>

						<DropdownMenuSeparator />
						<DropdownMenuItem onPress={signOut}>
							<Text>
								<LucideIcon name="LogOut" size={14} />
							</Text>
							<Text>Log out</Text>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</View>
		</View>
	);
}
