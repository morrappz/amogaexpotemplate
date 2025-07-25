"use dom";
import "../../global.css";

import { useState } from "react";
import { authConfig } from "@/config/authConfig";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/primitives/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/primitives/tabs";
import { Label } from "@/components/primitives/label";
import { Badge } from "@/components/primitives/badge";
import { Separator } from "@/components/primitives/separator";
import {
	MessageCircle,
	Phone,
	User as UserIcon,
	Mail,
	Shield,
	CheckCircle,
	ArrowRight,
	Loader2,
	ArrowLeft,
	RefreshCw,
	Lock,
	Eye,
	EyeOff,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/primitives/select";
import { Session, User, WeakPassword } from "@supabase/supabase-js";
import { authService, SocialProvider } from "@/config/socialAuth";

interface SocialLoginHandler {
	name: SocialProvider;
	color: string;
	label: string;
	handler: () => Promise<void>;
}

export default function MobileAuth({
	navigate,
	signIn,
	toast,
	verifySendOtp,
	verifyOtp,
}: {
	dom: import("expo/dom").DOMProps;
	navigate: (path: string) => void;
	signIn: (
		email: string,
		password: string,
	) => Promise<
		| {
				user: User;
				session: Session;
				weakPassword?: WeakPassword;
		  }
		| boolean
	>;
	toast: (
		message: string,
		variant?: string,
		options?: Record<string, any> | undefined,
	) => void;
	verifySendOtp: (
		user_email: string,
		user_phone: string,
		first_name: string,
		last_name: string,
		business_name: string,
		business_number: string,
		business_zipcode: string,
		business_mobile: string,
		password: string,
		register?: boolean,
	) => Promise<boolean>;
	verifyOtp: (
		otp: string,
		user_email: string,
		user_phone: string,
		password: string,
		name: string,
		register?: boolean,
	) => Promise<boolean>;
}) {
	const [activeTab, setActiveTab] = useState("signin");
	const [step, setStep] = useState<"form" | "otp">("form");
	const [loading, setLoading] = useState(false);

	// Form data
	const [mobile, setMobile] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [businessNumber, setBusinessNumber] = useState("");
	const [businessZipCode, setBusinessZipCode] = useState("");
	const [businessMobile, setBusinessMobile] = useState("");
	const [emailOtp, setEmailOtp] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [otp, setOtp] = useState("");
	const [countdown, setCountdown] = useState(0);

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const resetForm = () => {
		setMobile("");
		setFirstName("");
		setLastName("");
		setEmail("");
		setBusinessName("");
		setBusinessNumber("");
		setBusinessZipCode("");
		setBusinessMobile("");
		setEmailOtp("");
		setPassword("");
		setOtp("");
		setStep("form");
	};

	const isPasswordInvalid = () => {
		return password.length > 0 && password.length < 8;
	};

	const socialLoginHandlers: SocialLoginHandler[] = [
		{
			name: "google",
			color: "#DB4437",
			label: "Google",
			handler: async () => {
				try {
					const result = await authService.signInWithProvider("google");
					console.log("result------", result);
				} catch (error) {
					toast("Failed to login with Google", "error");
				}
			},
		},
		{
			name: "github",
			color: "#333333",
			label: "GitHub",
			handler: async () => {
				try {
					await authService.signInWithProvider("github");
				} catch (error) {
					toast("Failed to login with GitHub", "error");
				}
			},
		},
		// Add other providers similarly
	];

	const canSendOTP = () => {
		if (activeTab === "signin") {
			return emailOtp.trim() && validateEmail(emailOtp);
		} else {
			return (
				firstName.trim() &&
				email.trim() &&
				validateEmail(email) &&
				!isPasswordInvalid()
			);
		}
	};

	const canSignInWithPassword = () => {
		return email.trim() && validateEmail(email) && password.trim().length >= 6;
	};

	const sendOTP = async (register: boolean = true) => {
		if (!canSendOTP()) return;

		setLoading(true);
		console.log("data------", email, mobile);
		const result = await verifySendOtp(
			email || emailOtp,
			mobile,
			firstName,
			lastName,
			businessName,
			businessNumber,
			businessZipCode,
			businessMobile,
			password,
			register,
		);
		console.log("result------", result);
		if (!result) {
			setLoading(false);
			return;
		}

		setStep("otp");
		setCountdown(60);
		setLoading(false);
		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const signInWithPassword = async () => {
		if (!canSignInWithPassword()) return;

		setLoading(true);

		const result = await signIn(email, password);

		if (
			result &&
			typeof result === "object" &&
			"user" in result &&
			result.user.id
		) {
			console.log("loged in");
		} else {
			toast("Invalid credentials. Use password: password123 for demo", "error");
		}
		setLoading(false);
	};

	const submitVerifyOTP = async () => {
		setLoading(true);

		const result = await verifyOtp(
			otp,
			email || emailOtp,
			mobile,
			password,
			firstName + " " + lastName,
			activeTab === "signin" ? false : true,
		);
		if (result) {
		}

		setLoading(false);
	};

	const goBack = () => {
		setStep("form");
		setOtp("");
	};

	if (step === "otp") {
		return (
			<div className="w-full min-h-screen bg-gray-100 p-4 flex items-center justify-center">
				<div className="w-full max-w-sm">
					<Card className="w-full max-h-[500px] h-full overflow-y-auto shadow-lg">
						<CardHeader className="text-center flex-1 space-y-4">
							<div className="flex items-center justify-between">
								<Button variant="ghost" size="icon" onClick={goBack}>
									<ArrowLeft className="h-5 w-5" />
								</Button>
								<div className="p-3 bg-green-100 rounded-full">
									<Shield className="h-6 w-6 text-green-600" />
								</div>
								<div className="w-10" />
							</div>
							<div>
								<CardTitle className="text-xl">Enter OTP</CardTitle>
								<CardDescription className="mt-2">
									{/* Code sent to {mobile} */}
									{/* {activeTab === "signup" && email && (
                                        <>
                                            <br />
                                            and {email}
                                        </>
                                    )} */}
									Code sent to {email || emailOtp}
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="space-y-2">
								<Label>Verification Code</Label>
								<Input
									type="text"
									placeholder="000000"
									value={otp}
									onChange={(e) =>
										setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
									}
									className="text-center text-2xl tracking-widest font-mono h-14"
									maxLength={6}
								/>
							</div>

							<Button
								onClick={submitVerifyOTP}
								disabled={otp.length !== 6 || loading}
								className="w-full h-12"
							>
								{loading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Verifying...
									</>
								) : (
									<>
										<CheckCircle className="mr-2 h-4 w-4" />
										{activeTab === "signup" ? "Create Account" : "Sign In"}
									</>
								)}
							</Button>

							<div className="text-center">
								{countdown > 0 ? (
									<p className="text-sm text-muted-foreground">
										Resend in {countdown}s
									</p>
								) : (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => sendOTP(false)}
									>
										<RefreshCw className="mr-2 h-4 w-4" />
										Resend OTP
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full min-h-screen bg-gray-100 p-4 flex items-center justify-center">
			<div className="w-full max-w-sm">
				<Card className="w-full max-h-[screen] h-full overflow-y-auto shadow-lg">
					<CardHeader className="text-center space-y-4">
						<div>
							<CardTitle className="text-xl font-sans">Morr appz</CardTitle>
							<CardDescription className="mt-2 font-sans">
								{activeTab === "signin"
									? "Sign in to your account"
									: "Create your account to get started"}
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<Tabs
							value={activeTab}
							onValueChange={(value) => {
								setActiveTab(value);
								resetForm();
							}}
						>
							<TabsList className="grid w-full font-sans grid-cols-2">
								<TabsTrigger value="signin">Sign In</TabsTrigger>
								<TabsTrigger value="signup">Sign Up</TabsTrigger>
							</TabsList>

							<TabsContent
								value="signin"
								className="overflow-y-auto max-h-[500px] space-y-6 mt-6"
							>
								{authConfig.modes.map(
									(mode, index) =>
										mode.enabled && (
											<div key={mode.id}>
												{/* Add separator between modes */}
												{index > 0 && (
													<div className="relative mb-6">
														<Separator />
														<div className="absolute inset-0 flex items-center justify-center">
															<span className="bg-white px-2 text-xs text-muted-foreground">
																OR
															</span>
														</div>
													</div>
												)}

												{/* Email & Password Mode */}
												{mode.id === "email-password" && (
													<div className="space-y-2">
														<div className="space-y-2">
															<Label>Email Address</Label>
															<div className="relative">
																<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
																<Input
																	type="email"
																	placeholder="john@example.com"
																	value={email}
																	onChange={(e) => setEmail(e.target.value)}
																	className="pl-10 h-12 text-base"
																/>
															</div>
														</div>

														<div className="space-y-2">
															<Label>Password</Label>
															<div className="relative">
																<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
																<Input
																	type={showPassword ? "text" : "password"}
																	placeholder="Enter your password"
																	value={password}
																	onChange={(e) => setPassword(e.target.value)}
																	className={`pl-10 pr-10 h-12 text-base ${isPasswordInvalid() ? "border-red-500 focus:border-red-500 ring-red-500" : ""}`}
																/>
																<Button
																	type="button"
																	variant="ghost"
																	size="icon"
																	className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
																	onClick={() => setShowPassword(!showPassword)}
																>
																	{showPassword ? (
																		<EyeOff className="h-4 w-4" />
																	) : (
																		<Eye className="h-4 w-4" />
																	)}
																</Button>
															</div>
															<p
																className={`text-xs mt-1 ${isPasswordInvalid() ? "text-red-600" : "text-muted-foreground"}`}
															>
																{isPasswordInvalid()
																	? "Password must be at least 8 characters"
																	: ""}
															</p>
														</div>

														<Button
															onClick={signInWithPassword}
															disabled={!canSignInWithPassword() || loading}
															className="w-full h-12"
															variant="outline"
														>
															{loading ? (
																<>
																	<Loader2 className="mr-2 h-4 w-4 animate-spin" />
																	Signing In...
																</>
															) : (
																<>
																	<Lock className="mr-2 h-4 w-4" />
																	Sign In with Password
																</>
															)}
														</Button>
													</div>
												)}

												{mode.id === "mobile-otp" && (
													<div className="space-y-2">
														<div className="space-y-2">
															<Label>Email Address</Label>
															<div className="relative">
																<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
																<Input
																	type="email"
																	placeholder="john@example.com"
																	value={emailOtp}
																	onChange={(e) => setEmailOtp(e.target.value)}
																	className="pl-10 h-12 text-base"
																/>
															</div>
														</div>

														<div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
															<div className="flex items-center gap-2 mb-1">
																<Shield className="h-4 w-4 text-blue-600" />
																<span className="text-sm font-sans font-medium">
																	OTP Verification
																</span>
															</div>
															<p className="text-xs font-sans text-blue-700">
																We`&apos;`ll send a verification code to your
																email.
															</p>
														</div>

														<Button
															onClick={() => sendOTP(false)}
															disabled={!canSendOTP() || loading}
															className="w-full h-12 bg-transparent"
															variant="outline"
														>
															{loading ? (
																<>
																	<Loader2 className="mr-2 h-4 w-4 animate-spin" />
																	Sending...
																</>
															) : (
																<>
																	<Phone className="mr-2 h-4 w-4" />
																	Sign In with OTP
																</>
															)}
														</Button>
													</div>
												)}

												{/* Email, Password & Social Mode */}
												{mode.id === "email-password-social" &&
													mode.socialProviders && (
														<div className="grid grid-cols-2 items-center gap-2.5">
															{socialLoginHandlers.map((provider) => (
																<Button
																	key={provider.name}
																	onClick={provider.handler}
																	className="w-full h-12"
																	variant="outline"
																	style={{
																		backgroundColor: provider.color,
																		color: "white",
																	}}
																>
																	{provider.label}
																</Button>
															))}
														</div>
													)}
											</div>
										),
								)}
							</TabsContent>

							<TabsContent
								value="signup"
								className="space-y-4 max-h-[500px] overflow-y-auto mt-6"
							>
								<div className="space-y-4">
									<div className="space-y-2">
										<Label>First Name</Label>
										<div className="relative">
											<UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="text"
												placeholder="First Name"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
										<Label>Last Name</Label>
										<div className="relative">
											<UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="text"
												placeholder="Last Name"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label>Email</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="email"
												placeholder="john@example.com"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label>Mobile</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="number"
												placeholder="Mobile"
												value={mobile}
												onChange={(e) => setMobile(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label>Business Name</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="text"
												placeholder="Business Name"
												value={businessName}
												onChange={(e) => setBusinessName(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label>Business Number</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="text"
												placeholder="Business Number"
												value={businessNumber}
												onChange={(e) => setBusinessNumber(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label>Business ZipCode</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="number"
												placeholder="Business Zip Code"
												value={businessZipCode}
												onChange={(e) => setBusinessZipCode(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<Label>Business Mobile</Label>
										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type="text"
												placeholder="Business Mobile"
												value={businessMobile}
												onChange={(e) => setBusinessMobile(e.target.value)}
												className="pl-10 h-12 text-base"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label>Password</Label>
										<div className="relative">
											<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="Enter your password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												className={`pl-10 pr-10 h-12 text-base ${isPasswordInvalid() ? "border-red-500 focus:border-red-500 ring-red-500" : ""}`}
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</Button>
										</div>
										<p
											className={`text-xs font-sans mt-1 ${isPasswordInvalid() ? "text-red-600" : "text-muted-foreground"}`}
										>
											{isPasswordInvalid()
												? "Password must be at least 8 characters"
												: "Minimum 8 characters required"}
										</p>
									</div>

									<div className="bg-green-50 p-3 rounded-lg border border-green-200">
										<div className="flex items-center gap-2 mb-1">
											<Shield className="h-4 w-4 text-green-600" />
											<span className="text-sm font-sans font-medium">
												Create Account
											</span>
										</div>
										<p className="text-xs font-sans text-green-700">
											We`&apos;`ll send an OTP to your email to verify your
											account.
										</p>
									</div>

									<Button
										onClick={() => sendOTP()}
										disabled={!canSendOTP() || loading}
										className="w-full h-12"
									>
										{loading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Sending OTP...
											</>
										) : (
											<>
												Create Account & Send OTP
												<ArrowRight className="ml-2 h-4 w-4" />
											</>
										)}
									</Button>
								</div>
							</TabsContent>
						</Tabs>

						<div className="text-center"></div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
