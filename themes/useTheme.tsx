import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode =
	| "light"
	| "dark"
	| "natural"
	| "mono"
	| "green"
	| "blue"
	| "neo";

const ThemeContext = createContext<{
	theme: ThemeMode;
	setTheme: (theme: ThemeMode) => void;
	toggleTheme: () => void;
}>({
	theme: "light",
	setTheme: () => {},
	toggleTheme: () => {},
});

const STORAGE_KEY = "@app_theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setThemeState] = useState<ThemeMode>("light");

	// Load theme on first mount
	useEffect(() => {
		const loadStoredTheme = async () => {
			let stored: string | null = null;
			if (Platform.OS === "web") {
				stored = localStorage.getItem("app_theme");
			} else {
				stored = await AsyncStorage.getItem(STORAGE_KEY);
			}

			if (stored && isValidTheme(stored)) {
				setThemeState(stored as ThemeMode);
			}
		};

		loadStoredTheme();
	}, []);

	// Apply theme to DOM when changed
	useEffect(() => {
		if (Platform.OS === "web") {
			const el = document.documentElement;
			el.classList.remove(
				"light",
				"dark",
				"natural",
				"mono",
				"green",
				"blue",
				"neo",
			);
			el.classList.add(theme);
		}
	}, [theme]);

	// Update both state + storage
	const setTheme = (newTheme: ThemeMode) => {
		setThemeState(newTheme);

		if (Platform.OS === "web") {
			localStorage.setItem("app_theme", newTheme);
		} else {
			AsyncStorage.setItem(STORAGE_KEY, newTheme);
		}
	};

	const toggleTheme = () => {
		const themes: ThemeMode[] = ["light", "dark"];
		const index = themes.indexOf(theme);
		const nextIndex = index === -1 || index === 1 ? 0 : 1;
		setTheme(themes[nextIndex]);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

function isValidTheme(theme: string): theme is ThemeMode {
	return ["light", "dark", "natural", "mono", "green", "blue", "neo"].includes(
		theme,
	);
}

export const useAppTheme = () => useContext(ThemeContext);
