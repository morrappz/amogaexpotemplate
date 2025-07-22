import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/supabase-provider";
import { Header } from "@/components/Header";
import { HeaderProvider } from "@/context/header-context";
import { SafeAreaView } from "@/components/safe-area-view";

export const unstable_settings = {
	initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
	const { initialized, session, isFetchingUserInfo } = useAuth();

	if (!initialized) {
		return null;
	}

	if (isFetchingUserInfo) {
		return null;
	}

	if (!session && !isFetchingUserInfo) {
		return <Redirect href="/login" />;
	}

	return (
		<HeaderProvider>
			<SafeAreaView className="flex-1 bg-background">
				<Header />
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="index" />
					<Stack.Screen name="modal" options={{ presentation: "modal" }} />
					<Stack.Screen name="notifications" />
					<Stack.Screen name="contacts" />
				</Stack>
			</SafeAreaView>
		</HeaderProvider>
	);
}
