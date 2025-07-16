import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { authMiddleware } from "@/middlewares/auth-middleware";

const tags = ["Users"];

const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.string().nullable(),
	username: z.string().nullable(),
	displayUsername: z.string().nullable(),
	twoFactorEnabled: z.boolean().nullable(),
	role: z.string().nullable(),
	banned: z.boolean().nullable(),
	banReason: z.string().nullable(),
	banExpires: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const list = createRoute({
	path: "/users",
	method: "get",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(userSchema), "Users"),
	},
});

export const getOne = createRoute({
	path: "/users/{id}",
	method: "get",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(userSchema, "User"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"User not found"
		),
	},
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
