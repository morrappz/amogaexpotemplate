import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { SplashScreen, useRouter } from "expo-router";

import { Session, User, WeakPassword } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";
import { Platform } from "react-native";
import { extractParamsFromQuery, extractParamsFromUrl } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "@/database";
import { useDatabase } from "@nozbe/watermelondb/react";

SplashScreen.preventAutoHideAsync();

interface AuthState {
	initialized: boolean;
	session: Session | null;
	tempLoginSession: Session | null;
	userCatalog: any | null;
	allowedPages: {
		page_name: string;
		page_link: string;
		page_icon_name?: string;
		page_icon_url?: string;
	}[];
	allowedPaths: string[];
	isFetchingUserInfo: boolean;
	signUp: (
		email: string,
		password: string,
	) => Promise<boolean | { user: User | null; session: Session | null }>;
	signIn: (
		email: string,
		password: string,
	) => Promise<
		boolean | { user: User; session: Session; weakPassword?: WeakPassword }
	>;
	signOut: () => Promise<void>;
	getGoogleOAuthUrl: (redirectTo: string) => Promise<string | null>;
	setOAuthSession: (tokens: {
		access_token: string;
		refresh_token: string;
	}) => Promise<void>;
	setSession: Dispatch<SetStateAction<Session | null>>;
}

export const AuthContext = createContext<AuthState>({
	initialized: false,
	session: null,
	tempLoginSession: null,
	userCatalog: null,
	allowedPages: [],
	allowedPaths: [],
	isFetchingUserInfo: false,
	signUp: async () => false,
	signIn: async () => false,
	signOut: async () => {},
	getGoogleOAuthUrl: async () => "",
	setOAuthSession: async () => {},
	setSession: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Session | null>(null);
	const [tempLoginSession, SetTempLoginSession] = useState<Session | null>(
		null,
	);
	const [userCatalog, setUserCatalog] = useState<any | null>(null);
	const [allowedPaths, setAllowedPaths] = useState<string[]>([]);
	const [allowedPages, setAllowedPages] = useState<
		{
			page_name: string;
			page_link: string;
			page_icon_name?: string;
			page_icon_url?: string;
		}[]
	>([]);
	const [isFetchingUserInfo, setIsFetchingUserInfo] = useState(false);
	const router = useRouter();

	const fetchUserCatalogAndPermissions = async (userId: string) => {
		setIsFetchingUserInfo(true);
		try {
			const [userRes, allowedPathsRes] = await Promise.all([
				supabase
					.from("user_catalog")
					.select("*")
					.eq("user_id", userId)
					.maybeSingle(),
				supabase.rpc("get_allowed_paths", { user_uuid: userId }),
			]);

			const { data: userRows, error: userError } = userRes;
			const { data: paths, error: allowedPathsError } = allowedPathsRes;

			if (userError || !userRows) {
				setUserCatalog(null);
				setAllowedPages([]);
				setAllowedPaths([]);
			} else {
				setUserCatalog(userRows);
				if (!paths || allowedPathsError) {
					setAllowedPages([]);
					setAllowedPaths([]);
				} else {
					setAllowedPages(paths);
					setAllowedPaths(
						paths.map((row: { page_link: string }) => row.page_link),
					);
				}
			}
		} finally {
			setIsFetchingUserInfo(false);
		}
	};

	const signUp = async (
		email: string,
		password: string,
	): Promise<boolean | { user: User | null; session: Session | null }> => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			console.error("Error signing up:", error);
			return false;
		}

		if (data.session) {
			// setSession(data.session);
			SetTempLoginSession(data.session);
			console.log("User signed up:", data.user);
			return data;
		} else {
			console.log("No user returned from sign up");
		}
		return false;
	};

	const signIn = async (
		email: string,
		password: string,
	): Promise<
		boolean | { user: User; session: Session; weakPassword?: WeakPassword }
	> => {
		await handleLogout(); // Ensure we clear any previous session before signing in
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error(error);
			return false;
		}

		if (data.session) {
			setSession(data.session);
			console.log("User signed in:", data.user);
			return data;
		} else {
			console.log("No user returned from sign in");
			return false;
		}
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error signing out:", error);
			return;
		} else {
			await handleLogout();
			console.log("User signed out");
		}
	};

	const getGoogleOAuthUrl = async (
		redirectTo: string,
	): Promise<string | null> => {
		const result = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: redirectTo,
			},
		});

		return result.data.url;
	};

	const setOAuthSession = async (tokens: {
		access_token: string;
		refresh_token: string;
	}) => {
		const { data, error } = await supabase.auth.setSession({
			access_token: tokens.access_token,
			refresh_token: tokens.refresh_token,
		});

		if (error) throw error;
		setSession(data.session);
		//   setLoggedIn(data.session !== null);
	};

	const handleLogout = async () => {
		// Clear async storage (auth/session)
		await AsyncStorage.clear();

		// Wipe WatermelonDB

		await database.write(async () => {
			await database.unsafeResetDatabase();
		});
		console.log("Database reset");
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		setInitialized(true);
	}, []);

	// Fetch user catalog and permissions when session changes
	useEffect(() => {
		if (session && session.user) {
			fetchUserCatalogAndPermissions(session.user.id);
		} else {
			setUserCatalog(null);
			setAllowedPages([]);
			setAllowedPaths([]);
		}
	}, [session]);

	useEffect(() => {
		if (initialized) {
			SplashScreen.hideAsync();

			// On web, check for tokens in the URL on the /authenticating page
			if (
				Platform.OS === "web" &&
				typeof window !== "undefined" &&
				window.location.pathname === "/authenticating"
			) {
				let data = extractParamsFromUrl(window.location.href);
				if (!data.access_token || !data.refresh_token) {
					data = extractParamsFromQuery(window.location.href);
				}
				if (data.access_token && data.refresh_token) {
					setOAuthSession({
						access_token: data.access_token,
						refresh_token: data.refresh_token,
					});
					// Optionally, you can clean up the URL after processing
					window.history.replaceState({}, document.title, "/");
					return;
				}
			}

			if (session) {
				router.replace("/");
			} else {
				router.replace("/login");
			}
		}
		// eslint-disable-next-line
	}, [initialized, session]);

	return (
		<AuthContext.Provider
			value={{
				initialized,
				session,
				tempLoginSession,
				signUp,
				signIn,
				signOut,
				getGoogleOAuthUrl,
				setOAuthSession,
				setSession,
				userCatalog,
				allowedPages,
				allowedPaths,
				isFetchingUserInfo,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
