import { createRouter } from "@/lib/create-app";
import * as ticketIdHandlers from "./[ticketId]/ticket.handler";
import * as ticketIdRoutes from "./[ticketId]/ticket.routers";
import * as handlers from "./tickets.handlers";
import * as routes from "./tickets.routes";
import * as updateHandlers from "./update/updates.handlers";
import * as updateRoutes from "./update/updates.routers";

const router = createRouter()
	.openapi(routes.list, handlers.list)
	.openapi(routes.listToday, handlers.listToday)
	.openapi(routes.getOne, handlers.getOne)
	.openapi(updateRoutes.status, updateHandlers.status)
	.openapi(ticketIdRoutes.attachments, ticketIdHandlers.getAttachments)
	.openapi(ticketIdRoutes.tasks, ticketIdHandlers.getTasks)
	.openapi(ticketIdRoutes.worklogs, ticketIdHandlers.getWorklogs)
	.openapi(ticketIdRoutes.comments, ticketIdHandlers.getComments)
	.openapi(ticketIdRoutes.activities, ticketIdHandlers.getActivities);

export default router;
