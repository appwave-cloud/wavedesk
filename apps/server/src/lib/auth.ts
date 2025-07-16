import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
	admin,
	apiKey,
	organization,
	twoFactor,
	username,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import prisma from "prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	plugins: [
		username(),
		twoFactor(),
		passkey(),
		admin(),
		apiKey({
			enableMetadata: true,
		}),
		organization({
			teams: {
				enabled: true,
				maximumTeams: 15,
			},
		}),
	],
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
	},
});
