import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
	Variables: {
		logger: PinoLogger;
		organizationId: string | undefined;
	};
}

// biome-ignore lint/complexity/noBannedTypes: needed for stoker
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	AppBindings
>;

export type KeyMetadata = {
	organizationId: string;
};
