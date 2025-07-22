import { Linking, Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "./supabase";

export type SocialProvider = "google" | "facebook" | "linkedin" | "github";

export class AuthService {
	private readonly SUPABASE_URL = "https://rhserbzkxiohaboutpzl.supabase.co";
	private readonly SUPABASE_AUTH_PATH = "/auth/v1/authorize";

	async signInWithProvider(provider: SocialProvider) {
		if (Platform.OS === "web") {
			// ✅ Use location.href instead of supabase.client SDK to avoid popup
			const redirectTo = "http://localhost:8081/auth/callback";
			const url = `${this.SUPABASE_URL}${this.SUPABASE_AUTH_PATH}?provider=${provider}&redirect_to=${encodeURIComponent(redirectTo)}`;
			console.log("url----------", url);
			window.location.href = url; // full page redirect
		} else {
			try {
				const redirectUri = "yourapp://auth/callback"; // ✅ use actual deep link here (for mobile)
				const authUrl = `${this.SUPABASE_URL}${this.SUPABASE_AUTH_PATH}?provider=${provider}&redirect_to=${encodeURIComponent(redirectUri)}`;

				const result = await WebBrowser.openAuthSessionAsync(
					authUrl,
					redirectUri,
				);

				if (result.type === "success") {
					const { url } = result;
					const params = new URLSearchParams(url.split("#")[1]);
					const access_token = params.get("access_token");
					const refresh_token = params.get("refresh_token");

					return { access_token, refresh_token };
				} else {
					throw new Error("Authentication was cancelled or failed");
				}
			} catch (error) {
				console.error("Social login error:", error);
				throw error;
			}
		}
	}
}

export const authService = new AuthService();
