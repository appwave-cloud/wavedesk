import { createRouter } from "@/lib/create-app";
import * as handlers from "./ticket.handler";
import * as routes from "./ticket.routers";

const router = createRouter().openapi(
	routes.attachments,
	handlers.getAttachments
);

export default router;
