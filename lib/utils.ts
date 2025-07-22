import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const extractParamsFromUrl = (url: string) => {
	// Handles URLs like amogamobile://authenticating#access_token=...&refresh_token=...
	const hashIndex = url.indexOf('#');
	if (hashIndex === -1) return {};
	const params = new URLSearchParams(url.substring(hashIndex + 1));
	return {
		access_token: params.get("access_token"),
		expires_in: parseInt(params.get("expires_in") || "0"),
		refresh_token: params.get("refresh_token"),
		token_type: params.get("token_type"),
		provider_token: params.get("provider_token"),
	};
};

export const extractParamsFromQuery = (url: string) => {
	// Handles URLs like amogamobile://authenticating?access_token=...&refresh_token=...
	const queryIndex = url.indexOf('?');
	if (queryIndex === -1) return {};
	const params = new URLSearchParams(url.substring(queryIndex + 1));
	return {
		access_token: params.get("access_token"),
		expires_in: parseInt(params.get("expires_in") || "0"),
		refresh_token: params.get("refresh_token"),
		token_type: params.get("token_type"),
		provider_token: params.get("provider_token"),
	};
};