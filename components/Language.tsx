import { View } from "react-native";
import { useTranslation } from "react-i18next";
import "../i18n";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
} from "./ui/select";
import { Languages } from "lucide-react-native";

export default function Language() {
	const { i18n } = useTranslation();
	return (
		<View>
			<Select>
				<SelectTrigger>
					<Languages />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem
							value="en-US"
							label="English"
							onPress={() => i18n.changeLanguage("en")}
						>
							ES
						</SelectItem>
						<SelectItem
							value="te-TE"
							label="Telugu"
							onPress={() => i18n.changeLanguage("te")}
						>
							TE
						</SelectItem>
						<SelectItem
							value="hi-HI"
							label="Hindi"
							onPress={() => i18n.changeLanguage("hi")}
						>
							HI
						</SelectItem>
						<SelectItem
							value="vi-VI"
							label="Vietnamese"
							onPress={() => i18n.changeLanguage("vi")}
						>
							VI
						</SelectItem>
						<SelectItem
							value="ms-MS"
							label="Malaysia"
							onPress={() => i18n.changeLanguage("ms")}
						>
							MS
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</View>
	);
}
