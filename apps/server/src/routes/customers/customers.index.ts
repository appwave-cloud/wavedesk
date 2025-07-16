import { createRouter } from "@/lib/create-app";
import * as handlers from "./customers.handlers";
import * as routes from "./customers.routes";

const router = createRouter()
	.openapi(routes.list, handlers.list)
	.openapi(routes.getOne, handlers.getOne);

export default router;
