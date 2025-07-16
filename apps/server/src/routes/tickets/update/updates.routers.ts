import { createRoute } from "@hono/zod-openapi";
import { TicketStatus } from "@prisma/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import z from "zod";

const tags = ["Tickets"];

export const status = createRoute({
	method: "post",
	path: "/tickets/{id}/status",
	description: "Update the status of a ticket",
	tags,
	request: {
		params: z.object({
			id: z.string(),
		}),
		body: jsonContent(
			z.object({
				status: z.nativeEnum(TicketStatus),
			}),
			"Ticket status updated"
		),
	},
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.object({
				message: z.string(),
			}),
			"Ticket status updated"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({
				message: z.string(),
			}),
			"Ticket not found"
		),
		[HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
			z.object({
				message: z.string(),
			}),
			"Internal server error"
		),
	},
});
