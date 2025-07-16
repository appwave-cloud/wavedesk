import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import z from "zod";
import { authMiddleware } from "@/middlewares/auth-middleware";

const tags = ["Customers"];

const customerSchema = z.object({
	id: z.string(),
	name: z.string(),
	customerContacts: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			email: z.string(),
			phone: z.string(),
		})
	),
});

export const list = createRoute({
	method: "get",
	path: "/customers",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(z.array(customerSchema), "Customers"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Customer not found"
		),
	},
});

export const getOne = createRoute({
	method: "get",
	path: "/customers/{id}",
	tags,
	middleware: [authMiddleware],
	responses: {
		[HttpStatusCodes.OK]: jsonContent(customerSchema, "Customer"),
		[HttpStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Customer not found"
		),
	},
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
