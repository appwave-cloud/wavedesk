import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "./members.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
	const members = await db.member.findMany({
		where: {
			organizationId: c.var.organizationId,
		},
	});

	return c.json(members, 200);
};
