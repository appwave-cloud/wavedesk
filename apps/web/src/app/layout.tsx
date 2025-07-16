import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../index.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import Providers from "@/components/providers";

export const metadata: Metadata = {
	title: "Home | WaveDesk Tickets",
	description:
		"WaveDesk Ticket System - enhance your customer support with a modern, intuitive ticket system.",
	icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
	applicationName: "WaveDesk Tickets",
	creator: "WaveDesk",
	publisher: "AppWave",
	keywords: ["WaveDesk", "Tickets", "Support", "Management"],
	openGraph: {
		title: "WaveDesk Tickets",
		description:
			"WaveDesk Ticket System - enhance your customer support with a modern, intuitive ticket system.",
	},
	authors: [
		{ name: "WaveDesk", url: "https://wavedesk.app" },
		{
			name: "AppWave",
			url: "https://appwave.cloud",
		},
	],
	category: "software",
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();

	return (
		<html
			className={`${geist.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			<body>
				<Providers>
					<NextIntlClientProvider>{children}</NextIntlClientProvider>
				</Providers>
			</body>
		</html>
	);
}
