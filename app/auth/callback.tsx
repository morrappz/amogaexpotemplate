import { useEffect } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import { View, Text } from "react-native";
import { supabase } from "@/config/supabase"; // adjust import path

export default function AuthCallback() {
	const router = useRouter();
	const navState = useRootNavigationState();

	useEffect(() => {
		if (!navState?.key) return;

		const hash = window.location.hash;
		if (!hash) {
			console.log("check-----------------");
			router.replace("/login");
			return;
		}

		const params = new URLSearchParams(hash.substring(1));
		const access_token = params.get("access_token");
		const refresh_token = params.get("refresh_token");

		if (access_token && refresh_token) {
			console.log("here--------------", { access_token, refresh_token });
			// ✅ set the session so Supabase client is authenticated
			supabase.auth
				.setSession({ access_token, refresh_token })
				.then(({ data, error }) => {
					if (error) {
						console.error("Error setting session:", error);
						router.replace("/login");
					} else {
						router.replace("/(protected)/Home");
					}
				});
		} else {
			router.replace("/login");
		}
	}, [navState?.key]);

	return (
		<View className="flex-1 items-center justify-center">
			<Text>Signing you in...</Text>
		</View>
	);
}
