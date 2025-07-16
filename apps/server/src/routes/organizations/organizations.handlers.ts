import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type { GetOneRoute, ListRoute } from "./organizations.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
	if (c.var.organizationId) {
		const organization = await db.organization.findUnique({
			where: {
				id: c.var.organizationId,
			},
		});

		if (!organization) {
			return c.json({ message: "Organization not found" }, 404);
		}

		return c.json([organization], 200);
	}

	const organizations = await db.organization.findMany();

	return c.json(organizations, 200);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
	const organization = await db.organization.findUnique({
		where: {
			id: c.req.param("id"),
		},
	});

	if (!organization) {
		return c.json({ message: "Organization not found" }, 404);
	}

	return c.json(organization, 200);
};
