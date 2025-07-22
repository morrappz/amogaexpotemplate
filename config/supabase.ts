import { AppState, Platform } from "react-native";

import "react-native-get-random-values";
import * as aesjs from "aes-js";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase.types";

const supabaseUrl = "https://rhserbzkxiohaboutpzl.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoc2VyYnpreGlvaGFib3V0cHpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDQzNjksImV4cCI6MjA2ODQ4MDM2OX0.LZEMT7RzigDrcMIy2HSjzH4vR1_ke4GfQMITnqXK9xI";

class LargeSecureStore {
	private async _encrypt(key: string, value: string) {
		const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
		const cipher = new aesjs.ModeOfOperation.ctr(
			encryptionKey,
			new aesjs.Counter(1),
		);
		const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
		await SecureStore.setItemAsync(
			key,
			aesjs.utils.hex.fromBytes(encryptionKey),
		);
		return aesjs.utils.hex.fromBytes(encryptedBytes);
	}
	private async _decrypt(key: string, value: string) {
		const encryptionKeyHex = await SecureStore.getItemAsync(key);
		if (!encryptionKeyHex) {
			return encryptionKeyHex;
		}
		const cipher = new aesjs.ModeOfOperation.ctr(
			aesjs.utils.hex.toBytes(encryptionKeyHex),
			new aesjs.Counter(1),
		);
		const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
		return aesjs.utils.utf8.fromBytes(decryptedBytes);
	}
	async getItem(key: string) {
		const encrypted = await AsyncStorage.getItem(key);
		if (!encrypted) {
			return encrypted;
		}
		return await this._decrypt(key, encrypted);
	}
	async removeItem(key: string) {
		await AsyncStorage.removeItem(key);
		await SecureStore.deleteItemAsync(key);
	}
	async setItem(key: string, value: string) {
		const encrypted = await this._encrypt(key, value);
		await AsyncStorage.setItem(key, encrypted);
	}
}

class BrowserSecureStore {
	private static masterKey = "secure_store_master_key";

	private getOrCreateKey(): Uint8Array {
		const saved = localStorage.getItem(BrowserSecureStore.masterKey);
		if (saved) {
			return aesjs.utils.hex.toBytes(saved);
		}

		const key = crypto.getRandomValues(new Uint8Array(32)); // 256-bit key
		localStorage.setItem(
			BrowserSecureStore.masterKey,
			aesjs.utils.hex.fromBytes(key),
		);
		return key;
	}

	private encrypt(value: string): string {
		const key = this.getOrCreateKey();
		const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
		const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
		return aesjs.utils.hex.fromBytes(encryptedBytes);
	}

	private decrypt(encryptedHex: string): string {
		const key = this.getOrCreateKey();
		const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(1));
		const decryptedBytes = cipher.decrypt(
			aesjs.utils.hex.toBytes(encryptedHex),
		);
		return aesjs.utils.utf8.fromBytes(decryptedBytes);
	}

	async getItem(key: string): Promise<string | null> {
		const encrypted = localStorage.getItem(key);
		if (!encrypted) return null;
		try {
			return this.decrypt(encrypted);
		} catch {
			return null;
		}
	}

	async setItem(key: string, value: string): Promise<void> {
		const encrypted = this.encrypt(value);
		localStorage.setItem(key, encrypted);
	}

	async removeItem(key: string): Promise<void> {
		localStorage.removeItem(key);
	}
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		// storage: Platform.OS !== 'web' ? new LargeSecureStore() : undefined,
		storage:
			Platform.OS !== "web" ? new LargeSecureStore() : new BrowserSecureStore(),
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
