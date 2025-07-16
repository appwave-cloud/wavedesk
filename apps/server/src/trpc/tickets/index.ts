import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "@/lib/trpc";
import { getTickets } from "./handler";

export const ticketsRouter = router({
	getTickets: protectedProcedure.query(async ({ ctx }) => {
		if (!ctx.session.session.activeOrganizationId) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Organization not found",
			});
		}

		const tickets = await getTickets(ctx.session.session.activeOrganizationId);

		return tickets;
	}),
});

export type TicketsRouter = typeof ticketsRouter;
