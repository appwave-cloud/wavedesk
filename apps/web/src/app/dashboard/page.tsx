"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export default function Dashboard() {
	const t = useTranslations("login");
	const { data: session, isPending } = authClient.useSession();

	const privateData = useQuery(trpc.tickets.getTickets.queryOptions());

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{t("title")}</h1>
			<p>Welcome {session?.user.name}</p>
			<p>privateData: {privateData.data?.at(0)?.title}</p>
		</div>
	);
}
