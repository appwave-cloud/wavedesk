import { createRoute } from "@hono/zod-openapi";
import { TicketPriority, TicketStatus } from "@prisma/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import z from "zod";
import { authMiddleware } from "@/middlewares/auth-middleware";

const tags = ["Tickets"];

const ticketSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	status: z.nativeEnum(TicketStatus),
	priority: z.nativeEnum(TicketPriority),
	category: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	customer: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	customerContacts: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			phone: z.string(),
			email: z.string(),
		})
	),
	assignedTo: z
		.object({
			id: z.string(),
			username: z.string().nullable(),
			email: z.string(),
		})
		.nullable(),
	createdBy: z.object({
		id: z.string(),
		username: z.string().nullable(),
		email: z.string(),
	}),
	organizationId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	escalatedAt: z.date().nullable(),
});

const ticketDetailSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	status: z.nativeEnum(TicketStatus),
	priority: z.nativeEnum(TicketPriority),
	category: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	customer: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	customerContacts: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			phone: z.string(),
			email: z.string(),
		})
	),
	assignedTo: z
		.object({
			id: z.string(),
			username: z.string().nullable(),
			email: z.string(),
		})
		.nullable(),
	createdBy: z.object({
		id: z.string(),
		username: z.string().nullable(),
		email: z.string(),
	}),
	organizationId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	escalatedAt: z.date().nullable(),
});

export const list = createRoute({
	method: "get",
	path: "/tickets",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(ticketSchema), "Tickets"),
	},
});

export const listToday = createRoute({
	method: "get",
	path: "/tickets/today",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(ticketSchema), "Tickets"),
	},
});

export const getOne = createRoute({
	method: "get",
	path: "/tickets/{id}",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(ticketDetailSchema, "Ticket"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Ticket not found"
		),
	},
});

export type ListRoute = typeof list;
export type ListTodayRoute = typeof listToday;
export type GetOneRoute = typeof getOne;
