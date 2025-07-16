import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import z from "zod";
import { authMiddleware } from "@/middlewares/auth-middleware";

const tags = ["Organizations"];

const memberSchema = z.object({
	id: z.string(),
	organizationId: z.string(),
	createdAt: z.date(),
	role: z.string(),
	userId: z.string(),
	teamId: z.string().nullable(),
});

export const list = createRoute({
	method: "get",
	path: "/organization/{organizationId}/members",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(memberSchema), "Members"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Member not found"
		),
	},
});

export type ListRoute = typeof list;
