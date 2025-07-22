export const authConfig = {
	modes: [
		{
			id: "email-password",
			label: "Email & Password",
			fields: ["email", "password"],
			social: false,
			enabled: true,
		},
		{
			id: "mobile-otp",
			label: "Mobile & OTP",
			fields: ["phone"],
			social: false,
			enabled: true,
		},
		{
			id: "email-password-social",
			label: "Email, Password & Social",
			fields: ["email", "password"],
			social: true,
			socialProviders: [
				{
					name: "google",
					label: "Google",
					icon: "google",
					color: "#DB4437",
				},
				{
					name: "facebook",
					label: "Facebook",
					icon: "facebook",
					color: "blue",
				},
				{
					name: "linkedin",
					label: "LinkedIn",
					icon: "linkedin",
					color: "#0077B5",
				},
				{
					name: "github",
					label: "GitHub",
					icon: "linkedin",
					color: "gray",
				},
			],
			enabled: true,
		},
	],
};
