import * as HttpStatusCodes from "stoker/http-status-codes";
import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type {
	ActivitiesRoute,
	AttachmentsRoute,
	CommentsRoute,
	TasksRoute,
	WorklogsRoute,
} from "./ticket.routers";

export const getAttachments: AppRouteHandler<AttachmentsRoute> = async (c) => {
	const attachments = await db.ticketAttachment.findMany({
		where: {
			ticketId: c.req.param("id"),
		},
		select: {
			id: true,
			fileName: true,
			fileUrl: true,
			fileSize: true,
			fileType: true,
			user: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			createdAt: true,
			updatedAt: true,
		},
	});

	return c.json(attachments, HttpStatusCodes.OK);
};

export const getTasks: AppRouteHandler<TasksRoute> = async (c) => {
	const tasks = await db.ticketTask.findMany({
		where: {
			ticketId: c.req.param("id"),
		},
		select: {
			id: true,
			content: true,
			isCompleted: true,
			createdBy: {
				select: {
					id: true,
					username: true,
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
			createdAt: true,
			updatedAt: true,
		},
	});

	return c.json(tasks, HttpStatusCodes.OK);
};

export const getWorklogs: AppRouteHandler<WorklogsRoute> = async (c) => {
	const worklogs = await db.ticketWorklog.findMany({
		where: {
			ticketId: c.req.param("id"),
		},
		select: {
			id: true,
			content: true,
			startedAt: true,
			endedAt: true,
			duration: true,
			user: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			createdAt: true,
			updatedAt: true,
		},
	});

	return c.json(worklogs, HttpStatusCodes.OK);
};

export const getComments: AppRouteHandler<CommentsRoute> = async (c) => {
	const comments = await db.ticketComment.findMany({
		where: {
			ticketId: c.req.param("id"),
		},
		select: {
			id: true,
			content: true,
			user: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			createdAt: true,
			updatedAt: true,
		},
	});

	return c.json(comments, HttpStatusCodes.OK);
};

export const getActivities: AppRouteHandler<ActivitiesRoute> = async (c) => {
	const activities = await db.ticketActivity.findMany({
		where: {
			ticketId: c.req.param("id"),
		},
		select: {
			id: true,
			type: true,
			content: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return c.json(activities, HttpStatusCodes.OK);
};
