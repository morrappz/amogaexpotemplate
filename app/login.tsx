import MobileAuth from "@/components/auth/mobile-auth";
import { SafeAreaView } from "@/components/safe-area-view";
import { useAuth } from "@/context/supabase-provider";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import { supabase } from "@/config/supabase";
import { useState } from "react";

export default function App() {
	const router = useRouter();
	const { signIn, setSession } = useAuth();
	const [otpDetails, setOtpDetails] = useState("");

	return (
		<SafeAreaView className="flex-1 bg-background" edges={["bottom"]}>
			<MobileAuth
				dom={{
					scrollEnabled: true,
				}}
				navigate={(path: string) => {
					if (path) router.push(path as any);
				}}
				signIn={async (email: string, password: string) => {
					return await signIn(email, password);
				}}
				verifySendOtp={async (
					user_email: string,
					user_phone: string,
					first_name: string,
					last_name: string,
					business_name: string,
					business_number: string,
					business_zipcode: string,
					business_mobile: string,
					password: string,
					register: boolean = true,
				) => {
					if (register) {
						const { data, error } = await supabase.auth.signUp({
							email: user_email,
							password: password,
						});
						// const { data, error } = await supabase.auth.signInWithOtp({
						// 	email: user_email,
						// 	options: {
						// 		shouldCreateUser: register,
						// 	},
						// });
						console.log("function", data, error);
						if (error) {
							toast.error("Error checking user existence");
							console.error(error.message);
							return false;
						}

						const { error: insertError } = await supabase
							.from("user_catalog")
							.insert({
								user_email: user_email,
								created_user_name: `${first_name} ${last_name}`,

								business_name,
								business_number,
								// business_zipcode,

								created_at: new Date().toISOString(),
							});

						if (insertError) {
							toast.error("Error creating user profile");
							return false;
						}

						if (data !== "USER_DOES_NOT_EXIST") {
							if (data === user_email) {
								toast.error("User email exist");
								return false;
							} else if (data === user_phone) {
								toast.error("User phone exist");
								return false;
							}
						}
					}

					const { data: sendOtp, error: sendOtpError } =
						await supabase.auth.signInWithOtp({
							email: user_email,
							options: {
								shouldCreateUser: register,
							},
						});
					if (sendOtpError) {
						toast.error(sendOtpError?.message || "Error can not send the otp");
						return false;
					}
					return true;
				}}
				verifyOtp={async (
					otp: string,
					user_email: string,
					user_phone: string,
					password: string,
					first_name: string,
					last_name: string,
					business_name: string,
					business_number: string,
					business_zipcode: string,
					business_mobile: string,
					register: boolean = true,
				) => {
					const { data: verifyOtp, error: verifyOtpError } =
						await supabase.auth.verifyOtp({
							email: user_email,
							token: otp,
							type: "email",
						});

					if (verifyOtpError || !verifyOtp.session) {
						toast.error(verifyOtpError?.message || "Error can verify the otp");
						return false;
					}

					if (register) {
						await supabase.auth.setSession(verifyOtp.session);

						const { data: updateUser, error: updateUserError } =
							await supabase.auth.updateUser({
								phone: user_phone,
								password: password,
								data: {
									full_name: name,
								},
							});

						if (updateUserError || !updateUser) {
							toast.error(
								updateUserError?.message ||
									"Error can not save user information",
							);
							return false;
						}
						console.log("here----------------------");
						const { data, error: insertError } = await supabase
							.from("user_catalog")
							.insert({
								user_catalog_id: verifyOtp.session.user.id,
								user_email: user_email,
								created_user_name: first_name + " " + last_name,
								password: password,
								business_name: business_name,
								business_number: business_number,
								business_zipcode: business_zipcode,
								business_mobile: business_mobile,
							});
						console.log("data-------", data);
					}

					setSession(verifyOtp.session);

					return true;
				}}
				toast={(
					message: string,
					variant: string = "default",
					options: Record<string, any> | undefined = undefined,
				) => {
					switch (variant) {
						case "error":
							toast.error(message, options);
							break;
						case "success":
							toast.success(message, options);
							break;
						case "warning":
							toast.warning(message, options);
							break;
						default:
							toast(message, options);
					}
				}}
			/>
		</SafeAreaView>
	);
}
