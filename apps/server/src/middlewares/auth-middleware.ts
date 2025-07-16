import type { MiddlewareHandler } from "hono";
import { auth } from "@/lib/auth";

export const authMiddleware: MiddlewareHandler<{
	Variables: { key: string; organizationId: string };
}> = async (c, next) => {
	const apiKey = c.req.header("key") ?? "";

	const { valid, key } = await auth.api.verifyApiKey({
		body: {
			key: apiKey,
		},
	});

	if (!valid) {
		return c.json({ message: "Unauthorized" }, 401);
	}

	if (key?.permissions?.["organization:read"]?.includes("*")) {
		c.set("organizationId", c.req.header("organizationId") ?? "");
	} else {
		const organizationId = key?.metadata?.organizationId;

		if (!organizationId) {
			return c.json({ message: "Unauthorized" }, 401);
		}

		c.set("organizationId", organizationId);
	}

	return next();
};
