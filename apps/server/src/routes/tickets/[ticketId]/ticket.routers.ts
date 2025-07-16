import { createRoute } from "@hono/zod-openapi";
import { TicketActivityType } from "@prisma/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import z from "zod";
import { authMiddleware } from "@/middlewares/auth-middleware";

const tags = ["Tickets"];

export const ticketAttatchments = z.array(
	z.object({
		id: z.string(),
		fileName: z.string(),
		fileUrl: z.string(),
		fileSize: z.number(),
		fileType: z.string(),
		user: z.object({
			id: z.string(),
			username: z.string().nullable(),
			email: z.string(),
		}),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
);

export const ticketTasks = z.array(
	z.object({
		id: z.string(),
		content: z.string(),
		isCompleted: z.boolean(),
		createdBy: z.object({
			id: z.string(),
			username: z.string().nullable(),
			email: z.string(),
		}),
		assignedTo: z
			.object({
				id: z.string(),
				username: z.string().nullable(),
				email: z.string(),
			})
			.nullable(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
);

export const ticketWorklogs = z.array(
	z.object({
		id: z.string(),
		content: z.string(),
		startedAt: z.date(),
		endedAt: z.date().nullable(),
		duration: z.number(),
		user: z.object({
			id: z.string(),
			username: z.string().nullable(),
			email: z.string(),
		}),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
);

export const ticketComments = z.array(
	z.object({
		id: z.string(),
		content: z.string(),
		user: z.object({
			id: z.string(),
			username: z.string().nullable(),
			email: z.string(),
		}),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
);

export const ticketActivities = z.array(
	z.object({
		id: z.string(),
		type: z.nativeEnum(TicketActivityType),
		content: z.string(),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
);

export const attachments = createRoute({
	method: "get",
	path: "/tickets/{id}/attachments",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(ticketAttatchments, "Attachments"),
	},
});

export const tasks = createRoute({
	method: "get",
	path: "/tickets/{id}/tasks",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(ticketTasks, "Tasks"),
	},
});

export const worklogs = createRoute({
	method: "get",
	path: "/tickets/{id}/worklogs",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(ticketWorklogs, "Worklogs"),
	},
});

export const comments = createRoute({
	method: "get",
	path: "/tickets/{id}/comments",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(ticketComments, "Comments"),
	},
});

export const activities = createRoute({
	method: "get",
	path: "/tickets/{id}/activities",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(ticketActivities, "Activities"),
	},
});

export type AttachmentsRoute = typeof attachments;
export type TasksRoute = typeof tasks;
export type WorklogsRoute = typeof worklogs;
export type CommentsRoute = typeof comments;
export type ActivitiesRoute = typeof activities;
