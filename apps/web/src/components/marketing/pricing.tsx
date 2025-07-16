"use client";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Sparkles, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const plans = [
	{
		id: "starter",
		name: "Starter",
		icon: Star,
		price: {
			monthly: 99,
			yearly: 999,
		},
		description: "Perfect for small to medium-sized teams.",
		features: [
			"Up to 10 support agents",
			"Unlimited tickets",
			"Email & chat integration",
			"Standard analytics",
			"Basic email support",
		],
		cta: "Get started",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		icon: Zap,
		price: {
			monthly: 290,
			yearly: 2900,
		},
		description: "Perfect for large teams and enterprises.",
		features: [
			"Unlimited support agents",
			"Unlimited tickets",
			"Email & chat integration",
			"Advanced analytics",
			"Priority email support",
		],
		cta: "Get started",
		popular: true,
	},
	{
		id: "self-hosted",
		name: "Self-Hosted",
		icon: Shield,
		price: {
			monthly: 0,
			yearly: 0,
		},
		description:
			"Perfect for teams that want to host their own infrastructure.",
		features: [
			"Unlimited support agents",
			"Unlimited tickets",
			"Email & chat integration",
			"Advanced analytics",
			"Priority email support",
		],
		cta: "Contact us",
	},
];

export function Pricing() {
	const [frequency, setFrequency] = useState<string>("monthly");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div
			className="not-prose relative flex w-full flex-col gap-16 overflow-hidden px-4 py-24 text-center sm:px-8"
			id="pricing"
		>
			<div className="-z-10 absolute inset-0 overflow-hidden">
				<div className="-top-[10%] -translate-x-1/2 absolute left-[50%] h-[40%] w-[60%] rounded-full bg-primary/10 blur-3xl" />
				<div className="-bottom-[10%] -right-[10%] absolute h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
				<div className="-bottom-[10%] -left-[10%] absolute h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
			</div>

			<div className="flex flex-col items-center justify-center gap-8">
				<div className="flex flex-col items-center space-y-2">
					<Badge
						className="mb-4 rounded-full border-primary/20 bg-primary/5 px-4 py-1 font-medium text-sm"
						variant="outline"
					>
						<Sparkles className="mr-1 h-3.5 w-3.5 animate-pulse text-primary" />
						Pricing Plans
					</Badge>
					<motion.h1
						animate={{ opacity: 1, y: 0 }}
						className="bg-gradient-to-b from-foreground to-foreground/30 bg-clip-text font-bold text-4xl text-transparent sm:text-5xl"
						initial={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.5 }}
					>
						Pick the perfect plan for your needs
					</motion.h1>
					<motion.p
						animate={{ opacity: 1, y: 0 }}
						className="max-w-md pt-2 text-lg text-muted-foreground"
						initial={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						Simple, transparent pricing that scales with your business. No
						hidden fees, no surprises.
					</motion.p>
				</div>

				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					<Tabs
						className="inline-block rounded-full bg-muted/30 p-1 shadow-sm"
						defaultValue={frequency}
						onValueChange={setFrequency}
					>
						<TabsList className="bg-transparent">
							<TabsTrigger
								className="rounded-full transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-sm"
								value="monthly"
							>
								Monthly
							</TabsTrigger>
							<TabsTrigger
								className="rounded-full transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-sm"
								value="yearly"
							>
								Yearly
								<Badge
									className="ml-2 bg-primary/10 text-primary hover:bg-primary/15"
									variant="secondary"
								>
									20% off
								</Badge>
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</motion.div>

				<div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
					{/** biome-ignore lint/complexity/noExcessiveCognitiveComplexity: ignore */}
					{plans.map((plan, idx) => (
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="flex"
							initial={{ opacity: 0, y: 20 }}
							key={plan.id}
							transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
							whileHover={{ y: -5 }}
						>
							<Card
								className={cn(
									"relative h-full w-full bg-secondary/20 text-left transition-all duration-300 hover:shadow-lg",
									plan.popular
										? "shadow-md ring-2 ring-primary/50 dark:shadow-primary/10"
										: "hover:border-primary/30",
									plan.popular &&
										"bg-gradient-to-b from-primary/[0.03] to-transparent"
								)}
							>
								{plan.popular && (
									<div className="-top-3 absolute right-0 left-0 mx-auto w-fit">
										<Badge className="rounded-full bg-primary px-4 py-1 text-primary-foreground shadow-sm">
											<Sparkles className="mr-1 h-3.5 w-3.5" />
											Popular
										</Badge>
									</div>
								)}
								<CardHeader className={cn("pb-4", plan.popular && "pt-8")}>
									<div className="flex items-center gap-2">
										<div
											className={cn(
												"flex h-8 w-8 items-center justify-center rounded-full",
												plan.popular
													? "bg-primary/10 text-primary"
													: "bg-secondary text-foreground"
											)}
										>
											<plan.icon className="h-4 w-4" />
										</div>
										<CardTitle
											className={cn(
												"font-bold text-xl",
												plan.popular && "text-primary"
											)}
										>
											{plan.name}
										</CardTitle>
									</div>
									<CardDescription className="mt-3 space-y-2">
										<p className="text-sm">{plan.description}</p>
										<div className="pt-2">
											{typeof plan.price[
												frequency as keyof typeof plan.price
											] === "number" ? (
												<div className="flex items-baseline">
													<NumberFlow
														className={cn(
															"font-bold text-3xl",
															plan.popular ? "text-primary" : "text-foreground"
														)}
														format={{
															style: "currency",
															currency: "USD",
															maximumFractionDigits: 0,
														}}
														value={
															plan.price[
																frequency as keyof typeof plan.price
															] as number
														}
													/>
													<span className="ml-1 text-muted-foreground text-sm">
														/month, billed {frequency}
													</span>
												</div>
											) : (
												<span
													className={cn(
														"font-bold text-2xl",
														plan.popular ? "text-primary" : "text-foreground"
													)}
												>
													{plan.price[frequency as keyof typeof plan.price]}
												</span>
											)}
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent className="grid gap-3 pb-6">
									{plan.features.map((feature, index) => (
										<motion.div
											animate={{ opacity: 1, x: 0 }}
											className="flex items-center gap-2 text-sm"
											initial={{ opacity: 0, x: -5 }}
											key={feature}
											transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
										>
											<div
												className={cn(
													"flex h-5 w-5 items-center justify-center rounded-full",
													plan.popular
														? "bg-primary/10 text-primary"
														: "bg-secondary text-secondary-foreground"
												)}
											>
												<Check className="h-3.5 w-3.5" />
											</div>
											<span
												className={
													plan.popular
														? "text-foreground"
														: "text-muted-foreground"
												}
											>
												{feature}
											</span>
										</motion.div>
									))}
								</CardContent>
								<CardFooter>
									<Button
										className={cn(
											"w-full font-medium transition-all duration-300",
											plan.popular
												? "bg-primary hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20"
												: "hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
										)}
										variant={plan.popular ? "default" : "outline"}
									>
										{plan.cta}
										<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
									</Button>
								</CardFooter>

								{/* Subtle gradient effects */}
								{plan.popular ? (
									<>
										<div className="pointer-events-none absolute right-0 bottom-0 left-0 h-1/2 rounded-b-lg bg-gradient-to-t from-primary/[0.05] to-transparent" />
										<div className="pointer-events-none absolute inset-0 rounded-lg border border-primary/20" />
									</>
								) : (
									<div className="pointer-events-none absolute inset-0 rounded-lg border border-transparent opacity-0 transition-opacity duration-300 hover:border-primary/10 hover:opacity-100" />
								)}
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
