import { TicketPriority, TicketStatus } from "@prisma/client";
import z from "zod";

export const ticketSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().nullable(),
	status: z.nativeEnum(TicketStatus),
	priority: z.nativeEnum(TicketPriority),
	category: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	customer: z
		.object({
			id: z.string(),
			name: z.string(),
		})
		.nullable(),
	customerContacts: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			phone: z.string(),
			email: z.string(),
		})
	),
	assignedTo: z
		.object({
			id: z.string(),
			username: z.string().nullable(),
			email: z.string(),
		})
		.nullable(),
	createdBy: z.object({
		id: z.string(),
		username: z.string().nullable(),
		email: z.string(),
	}),
	organizationId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	escalatedAt: z.date().nullable(),
});

export type Ticket = z.infer<typeof ticketSchema>;
