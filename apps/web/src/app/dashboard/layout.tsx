import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TeamProvider } from "@/components/provider/team-provider";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
	children: ReactNode;
};

export const metadata: Metadata = {
	title: "Dashboard | WaveDesk Tickets",
	description: "Check your tickets and manage your support requests",
	icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export default function LocaleLayout({ children }: Props) {
	return (
		<TeamProvider>
			<SidebarProvider>
				<AppSidebar />
				{children}
			</SidebarProvider>
		</TeamProvider>
	);
}
