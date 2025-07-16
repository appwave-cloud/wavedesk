import { trpcServer } from "@hono/trpc-server";
import env from "env";
import { cors } from "hono/cors";
// biome-ignore lint/style/noExportedImports: needed
import app from "./app";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./trpc";

app.use(
	"/*",
	cors({
		origin: env.CORS_ORIGIN,
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	})
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
		createContext: (_opts, context) => {
			return createContext({ context });
		},
	})
);

export default app;
