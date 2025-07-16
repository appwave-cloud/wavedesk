import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import z from "zod";
import { authMiddleware } from "@/middlewares/auth-middleware";

const tags = ["Organizations"];

const organizationSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string().nullable(),
	logo: z.string().nullable(),
	metadata: z.string().nullable(),
});

export const list = createRoute({
	method: "get",
	path: "/organizations",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(
			z.array(organizationSchema),
			"Organizations"
		),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Organization not found"
		),
	},
});

export const getOne = createRoute({
	method: "get",
	path: "/organizations/{id}",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(organizationSchema, "Organization"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Organization not found"
		),
	},
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
