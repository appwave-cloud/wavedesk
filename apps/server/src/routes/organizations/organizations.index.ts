import { createRouter } from "@/lib/create-app";
import * as handlers from "./organizations.handlers";
import * as routes from "./organizations.routes";

const router = createRouter()
	.openapi(routes.list, handlers.list)
	.openapi(routes.getOne, handlers.getOne);

export default router;
