import { Scalar } from "@scalar/hono-api-reference";
import { version } from "bun";
import type { AppOpenAPI } from "./types";

export default function configureOpenAPI(app: AppOpenAPI) {
	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version,
			title: "WaveDesk API",
		},
	});

	app.get(
		"/docs",
		Scalar({
			title: "WaveDesk API",
			url: "/doc",
			theme: "deepSpace",
			persistAuth: true,
			searchHotKey: "k",
			defaultOpenAllTags: false,
			pageTitle: "WaveDesk API",
			defaultHttpClient: {
				targetKey: "js",
				clientKey: "fetch",
			},
			servers: [
				{
					url: "http://localhost:9000",
					description: "Local server",
				},
				{
					url: "https://api.wavedesk.app",
					description: "Production server",
				},
			],
		})
	);
}
