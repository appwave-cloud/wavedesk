import { db } from "@/lib/db";
import type { Ticket } from "@/schemas/ticket";

export const getTickets = async (organizationId: string): Promise<Ticket[]> => {
	const tickets = await db.ticket.findMany({
		where: {
			organizationId,
		},
		select: {
			id: true,
			title: true,
			description: true,
			status: true,
			priority: true,
			category: {
				select: {
					id: true,
					name: true,
				},
			},
			customer: {
				select: {
					id: true,
					name: true,
				},
			},
			customerContacts: {
				select: {
					id: true,
					name: true,
					phone: true,
					email: true,
				},
			},
			assignedTo: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			createdBy: {
				select: {
					id: true,
					username: true,
					email: true,
				},
			},
			organizationId: true,
			createdAt: true,
			updatedAt: true,
			escalatedAt: true,
		},
	});

	return tickets;
};
