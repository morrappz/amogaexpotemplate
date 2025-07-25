import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react-native";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "./elements/DropdownMenu";

const languages = [
	{ code: "en", label: "English", short: "EN" },
	{ code: "te", label: "Telugu", short: "TE" },
	{ code: "hi", label: "Hindi", short: "HI" },
	{ code: "vi", label: "Vietnamese", short: "VI" },
	{ code: "ms", label: "Malay", short: "MS" },
];

export default function Language() {
	const { i18n } = useTranslation();

	return (
		<View>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Text className=" size-7">
						<Languages size={24} className="text-primary" />
					</Text>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-44 native:w-52">
					<DropdownMenuLabel className="px-3 py-2 text-sm font-semibold">
						Select Language
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

					{languages.map(({ code, label, short }) => (
						<DropdownMenuItem
							key={code}
							onPress={() => i18n.changeLanguage(code)}
							className={`flex-row items-center justify-between px-3 py-2 ${
								i18n.language === code ? "bg-muted" : ""
							}`}
						>
							<Text className="text-foreground">{label}</Text>
							{i18n.language === code && (
								<Text className="text-xs text-muted-foreground">
									(selected)
								</Text>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</View>
	);
}
