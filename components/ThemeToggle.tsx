import { View } from "react-native";
import { useAppTheme } from "@/themes/useTheme";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
} from "./ui/select";
import { Palette } from "lucide-react-native";

export function ThemeToggle() {
	const { theme, setTheme } = useAppTheme();
	const themes = ["light", "dark", "blue", "green", "orange"];

	return (
		<View className="flex-row gap-2">
			<Select
				value={theme}
				onValueChange={(value) => {
					console.log("Selected theme:", value);
					setTheme(value?.label);
				}}
			>
				<SelectTrigger>
					<Palette className="w-5 h-5" />
				</SelectTrigger>
				<SelectContent className="bg-background">
					<SelectGroup>
						{themes.map((t) => (
							<SelectItem
								onPress={() => setTheme(t)}
								label={t}
								key={t}
								value={t}
							>
								{t}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</View>
	);
}
