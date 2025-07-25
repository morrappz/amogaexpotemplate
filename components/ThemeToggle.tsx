import { View, Text, Pressable } from "react-native";
import { LucideIcon, Palette } from "lucide-react-native";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "./elements/DropdownMenu";
import { useAppTheme } from "@/themes/useTheme";
import { Sun } from "lucide-react";

const themes = ["light", "dark", "natural", "mono", "green", "blue", "neo"];

export function ThemeToggle() {
	const { theme, setTheme, toggleTheme } = useAppTheme();

	return (
		<View className="flex-row gap-2.5 items-center">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Text className="">
						<Palette size={24} className="text-primary" />
					</Text>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-48 native:w-56">
					<DropdownMenuLabel className="px-3 py-2 text-sm font-semibold">
						Select Theme
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

					{themes.map((t) => (
						<DropdownMenuItem
							key={t}
							onPress={() => setTheme(t)}
							className={`flex-row items-center justify-between px-3 py-2 ${
								theme === t ? "bg-background" : ""
							}`}
						>
							<Text className="capitalize text-foreground">{t}</Text>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<Pressable onPress={toggleTheme}>
				<Sun className="text-primary" size={24} />
			</Pressable>
		</View>
	);
}
