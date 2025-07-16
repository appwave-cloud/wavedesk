import * as HttpStatusCodes from "stoker/http-status-codes";
import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type { GetOneRoute, ListRoute, ListTodayRoute } from "./tickets.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
	const tickets = await db.ticket.findMany({
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
			priority: true,
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			customer: {
				select: {
					id: true,
					name: true,
				},
			},
			customerContacts: {
				select: {
					id: true,
					name: true,
					phone: true,
					email: true,
				},
			},
			assignedTo: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			createdBy: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			organizationId: true,
			createdAt: true,
			updatedAt: true,
			escalatedAt: true,
		},
	});

	return c.json(tickets, HttpStatusCodes.OK);
};

export const listToday: AppRouteHandler<ListTodayRoute> = async (c) => {
	const tickets = await db.ticket.findMany({
		where: {
			createdAt: {
				gte: new Date(new Date().setHours(0, 0, 0, 0)),
				lte: new Date(new Date().setHours(23, 59, 59, 999)),
			},
		},
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
			priority: true,
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			customer: {
				select: {
					id: true,
					name: true,
				},
			},
			customerContacts: {
				select: {
					id: true,
					name: true,
					phone: true,
					email: true,
				},
			},
			assignedTo: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			createdBy: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			organizationId: true,
			createdAt: true,
			updatedAt: true,
			escalatedAt: true,
		},
	});

	return c.json(tickets, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
	const ticket = await db.ticket.findUnique({
		where: {
			id: c.req.param("id"),
		},
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
			priority: true,
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			customer: {
				select: {
					id: true,
					name: true,
				},
			},
			customerContacts: {
				select: {
					id: true,
					name: true,
					phone: true,
					email: true,
				},
			},
			assignedTo: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			createdBy: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			organizationId: true,
			createdAt: true,
			updatedAt: true,
			escalatedAt: true,
		},
	});

	if (!ticket) {
		return c.json({ message: "Ticket not found" }, HttpStatusCodes.NOT_FOUND);
	}

	return c.json(ticket, HttpStatusCodes.OK);
};
