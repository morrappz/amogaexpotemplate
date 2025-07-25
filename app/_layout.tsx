import "../global.css";

import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";
import { colors } from "@/constants/colors";
import { PortalHost } from "@rn-primitives/portal";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, useAppTheme } from "@/themes/useTheme";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
	return (
		<ThemeProvider>
			<ThemedApp />
		</ThemeProvider>
	);
}

function ThemedApp() {
	const { colorScheme } = useColorScheme();

	return (
		<>
			<GestureHandlerRootView className="flex flex-col h-full w-full md:max-w-2xl mx-auto">
				<AuthProvider>
					<Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
						<Stack.Screen name="(protected)" />
						<Stack.Screen name="welcome" />
						<Stack.Screen
							name="sign-up"
							options={{
								presentation: "modal",
								headerShown: true,
								headerTitle: "Sign Up",
								headerStyle: {
									backgroundColor:
										colorScheme === "dark"
											? colors.dark.background
											: colors.light.background,
								},
								headerTintColor:
									colorScheme === "dark"
										? colors.dark.foreground
										: colors.light.foreground,
								gestureEnabled: true,
							}}
						/>
						<Stack.Screen
							name="sign-in"
							options={{
								presentation: "modal",
								headerShown: true,
								headerTitle: "Sign In",
								headerStyle: {
									backgroundColor:
										colorScheme === "dark"
											? colors.dark.background
											: colors.light.background,
								},
								headerTintColor:
									colorScheme === "dark"
										? colors.dark.foreground
										: colors.light.foreground,
								gestureEnabled: true,
							}}
						/>
					</Stack>
				</AuthProvider>
				<PortalHost />
				<Toaster />
			</GestureHandlerRootView>
		</>
	);
}
