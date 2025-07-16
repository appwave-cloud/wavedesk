import * as HttpStatusCodes from "stoker/http-status-codes";
import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type { GetOneRoute, ListRoute } from "./customers.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
	if (c.var.organizationId) {
		const customers = await db.customer.findMany({
			where: {
				organizationId: c.var.organizationId,
			},
			select: {
				id: true,
				name: true,
				customerContacts: {
					select: {
						id: true,
						name: true,
						email: true,
						phone: true,
					},
				},
			},
		});

		return c.json(customers, HttpStatusCodes.OK);
	}

	const customers = await db.customer.findMany({
		where: {
			organizationId: c.var.organizationId,
		},
		select: {
			id: true,
			name: true,
			customerContacts: {
				select: {
					id: true,
					name: true,
					email: true,
					phone: true,
				},
			},
		},
	});

	return c.json(customers, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
	const customer = await db.customer.findUnique({
		where: {
			id: c.req.param("id"),
		},
		select: {
			id: true,
			name: true,
			customerContacts: {
				select: {
					id: true,
					name: true,
					email: true,
					phone: true,
				},
			},
		},
	});

	if (!customer) {
		return c.json({ message: "Customer not found" }, HttpStatusCodes.NOT_FOUND);
	}

	return c.json(customer, HttpStatusCodes.OK);
};
