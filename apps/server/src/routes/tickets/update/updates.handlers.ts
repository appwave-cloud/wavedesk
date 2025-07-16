import * as HttpStatusCodes from "stoker/http-status-codes";
import { db } from "@/lib/db";
import type { AppRouteHandler } from "@/lib/types";
import type { status as statusRoute } from "./updates.routers";

export const status: AppRouteHandler<typeof statusRoute> = async (c) => {
	try {
		const ticket = await db.ticket.update({
			where: {
				id: c.req.param("id"),
			},
			data: {
				status: c.req.valid("json").status,
			},
		});

		if (!ticket) {
			return c.json({ message: "Ticket not found" }, HttpStatusCodes.NOT_FOUND);
		}

		return c.json({ message: "Ticket status updated" }, HttpStatusCodes.OK);
	} catch {
		return c.json(
			{ message: "Internal server error" },
			HttpStatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};
