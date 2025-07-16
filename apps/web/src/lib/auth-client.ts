import {
	adminClient,
	apiKeyClient,
	emailOTPClient,
	organizationClient,
	passkeyClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	plugins: [
		usernameClient(),
		twoFactorClient(),
		emailOTPClient(),
		passkeyClient(),
		adminClient(),
		apiKeyClient(),
		organizationClient({
			teams: {
				enabled: true,
			},
		}),
	],
});
