import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { ticketsRouter } from "./tickets";

export const appRouter = router({
	healthCheck: publicProcedure.query(() => {
		return "OK";
	}),

	privateData: protectedProcedure.query(({ ctx }) => {
		return {
			message: "This is private",
			user: ctx.session.user,
		};
	}),

	tickets: ticketsRouter,
});

export type AppRouter = typeof appRouter;
