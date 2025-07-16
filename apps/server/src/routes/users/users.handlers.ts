import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type { GetOneRoute, ListRoute } from "./users.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
	if (c.var.organizationId) {
		const users = await db.user.findMany({
			where: {
				members: {
					some: {
						organizationId: c.var.organizationId,
					},
				},
			},
		});

		return c.json(users, 200);
	}

	const users = await db.user.findMany();

	return c.json(users, 200);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
	const user = await db.user.findUnique({
		where: {
			id: c.req.param("id"),
		},
	});

	if (!user) {
		return c.json({ message: "User not found" }, 404);
	}

	return c.json(user, 200);
};
