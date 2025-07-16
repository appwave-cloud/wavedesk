"use client";

// biome-ignore lint/performance/noNamespaceImport: needed
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const items = [
	{
		id: "1",
		title: "What makes WaveDesk Tickets different?",
		content:
			"WaveDesk Tickets is a modern, AI-powered ticket management system designed specifically for customer support teams. Unlike traditional systems, we offer intelligent ticket routing, automated responses, and advanced analytics to help you provide exceptional customer service while reducing response times.",
	},
	{
		id: "2",
		title: "How can I customize the ticket workflow?",
		content:
			"WaveDesk Tickets offers extensive customization options. You can create custom ticket types, set up automated workflows, define escalation rules, and customize the interface to match your brand. Our flexible system adapts to your team's unique processes and requirements.",
	},
	{
		id: "3",
		title: "Is WaveDesk Tickets suitable for my team size?",
		content:
			"Absolutely! WaveDesk Tickets scales from small teams to large enterprises. Our Starter plan is perfect for teams up to 10 agents, while our Enterprise plan supports unlimited agents and advanced features. We also offer a Self-Hosted option for complete control over your infrastructure.",
	},
	{
		id: "4",
		title: "Can I integrate WaveDesk with my existing tools?",
		content:
			"Yes, WaveDesk Tickets integrates seamlessly with popular tools and platforms. We support email integration, chat platforms, CRM systems, and offer a comprehensive API for custom integrations. Connect your existing workflow without disruption.",
	},
	{
		id: "5",
		title: "How do I get started with WaveDesk Tickets?",
		content:
			"Getting started is simple! Sign up for a free trial, invite your team members, and start creating tickets immediately. Our intuitive interface means minimal training time, and our support team is always available to help you get the most out of WaveDesk Tickets.",
	},
];

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 10,
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.05 * index,
			duration: 0.4,
		},
	}),
};

export function FAQ() {
	return (
		<section className="py-12 md:py-16" id="faq">
			<div className="container mx-auto max-w-6xl px-4 md:px-6">
				<div className="mb-10 text-center">
					<motion.h2
						animate={{ opacity: 1, y: 0 }}
						className="mb-4 font-bold text-3xl tracking-tight md:text-4xl"
						initial={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.5 }}
					>
						Frequently Asked{" "}
						<span className="bg-gradient-to-r from-primary to-rose-400 bg-clip-text text-transparent">
							Questions
						</span>
					</motion.h2>
					<motion.p
						animate={{ opacity: 1 }}
						className="mx-auto max-w-2xl text-muted-foreground"
						initial={{ opacity: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						Everything you need to know about WaveDesk Tickets and how to
						streamline your customer support operations.
					</motion.p>
				</div>

				<motion.div
					animate={{ opacity: 1 }}
					className="relative mx-auto max-w-3xl"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					{/* Decorative gradient */}
					<div className="-left-4 -top-4 -z-10 absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
					<div className="-bottom-4 -right-4 -z-10 absolute h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

					<Accordion
						className="w-full rounded-xl border border-border/40 bg-card/30 p-2 backdrop-blur-sm"
						collapsible
						defaultValue="1"
						type="single"
					>
						{items.map((item, index) => (
							<motion.div
								custom={index}
								initial="initial"
								key={item.id}
								variants={fadeInAnimationVariants}
								viewport={{ once: true }}
								whileInView="animate"
							>
								<AccordionItem
									className={cn(
										"my-1 overflow-hidden rounded-lg border-none bg-card/50 px-2 shadow-sm transition-all",
										"data-[state=open]:bg-card/80 data-[state=open]:shadow-md"
									)}
									value={item.id}
								>
									<AccordionPrimitive.Trigger className="flex">
										<AccordionPrimitive.Trigger
											className={cn(
												"group flex flex-1 items-center justify-between gap-4 py-4 text-left font-medium text-base",
												"outline-none transition-all duration-300 hover:text-primary",
												"focus-visible:ring-2 focus-visible:ring-primary/50",
												"data-[state=open]:text-primary"
											)}
										>
											{item.title}
											<PlusIcon
												aria-hidden="true"
												className={cn(
													"shrink-0 text-primary/70 transition-transform duration-300 ease-out",
													"group-data-[state=open]:rotate-45"
												)}
												size={18}
											/>
										</AccordionPrimitive.Trigger>
									</AccordionPrimitive.Trigger>
									<AccordionContent
										className={cn(
											"overflow-hidden pt-0 pb-4 text-muted-foreground",
											"data-[state=open]:animate-accordion-down",
											"data-[state=closed]:animate-accordion-up"
										)}
									>
										<div className="border-border/30 border-t pt-3">
											{item.content}
										</div>
									</AccordionContent>
								</AccordionItem>
							</motion.div>
						))}
					</Accordion>
				</motion.div>
			</div>
		</section>
	);
}
