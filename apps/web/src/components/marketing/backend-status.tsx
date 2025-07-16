"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/utils/trpc";

export function BackendStatus() {
	const healthCheck = useQuery(trpc.healthCheck.queryOptions());

	const getStatusConfig = () => {
		if (healthCheck.isLoading || healthCheck.isFetching) {
			return {
				icon: <Loader2 className="h-3 w-3 animate-spin" />,
				text: "Checking",
				className: "bg-muted text-muted-foreground border-border",
			};
		}

		if ((healthCheck.isError || !healthCheck.data) && !healthCheck.isLoading) {
			return {
				icon: <WifiOff className="h-3 w-3" />,
				text: "Offline",
				className:
					"bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
			};
		}

		return {
			icon: <Wifi className="h-3 w-3" />,
			text: "Online",
			className:
				"bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
		};
	};

	const config = getStatusConfig();

	return (
		<div className="flex items-center space-x-2">
			<Badge
				className={`${config.className} font-medium text-xs`}
				variant="outline"
			>
				{config.icon}
				<span className="ml-1">{config.text}</span>
			</Badge>
		</div>
	);
}
