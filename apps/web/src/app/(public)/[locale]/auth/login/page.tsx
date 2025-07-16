"use client";

import { useForm } from "@tanstack/react-form";
import { Shield, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
	email: z.email({
		message: "Invalid email address",
	}),
	password: z.string({
		error: "Password is required",
	}),
});

export default function Login() {
	const t = useTranslations("login");

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			try {
				const result = await authClient.signIn.email({
					email: value.email,
					password: value.password,
				});

				if (result.data) {
					toast.success("Login successful!");
				} else {
					toast.error(result.error?.message || "Login failed");
				}

				router.push("/dashboard");
			} catch {
				toast.error("An unexpected error occurred");
			} finally {
				setIsLoading(false);
			}
		},
	});

	return (
		<div className="flex min-h-screen bg-background">
			{/* Left side - Form */}
			<div className="flex flex-1 items-center justify-center p-8">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-center font-bold text-2xl">
							{t("title")}
						</CardTitle>
						<CardDescription className="text-center">
							{t("description")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							className="space-y-4"
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
						>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<form.Field
									name="email"
									validators={{
										onChange: formSchema.shape.email,
									}}
								>
									{(field) => (
										<>
											<Input
												className={
													field.state.meta.errors.length > 0
														? "border-destructive"
														: ""
												}
												id="email"
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="your@email.com"
												type="email"
												value={field.state.value}
											/>
											{field.state.meta.errors.length > 0 && (
												<p className="text-destructive text-sm">
													{field.state.meta.errors[0]?.message}
												</p>
											)}
										</>
									)}
								</form.Field>
							</div>

							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<form.Field
									name="password"
									validators={{
										onChange: formSchema.shape.password,
									}}
								>
									{(field) => (
										<>
											<Input
												className={
													field.state.meta.errors.length > 0
														? "border-destructive"
														: ""
												}
												id="password"
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Your password"
												type="password"
												value={field.state.value}
											/>
											{field.state.meta.errors.length > 0 && (
												<p className="text-destructive text-sm">
													{field.state.meta.errors[0]?.message}
												</p>
											)}
										</>
									)}
								</form.Field>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Checkbox id="remember" />
									<Label
										className="text-muted-foreground text-sm"
										htmlFor="remember"
									>
										Stay signed in
									</Label>
								</div>
								<a
									className="text-primary text-sm hover:underline"
									href="/auth/forgot-password"
								>
									Forgot password?
								</a>
							</div>

							<Button className="w-full" disabled={isLoading} type="submit">
								{isLoading ? "Signing in..." : "Sign in"}
							</Button>

							<div className="text-center text-muted-foreground text-sm">
								Don't have an account?{" "}
								<a
									className="text-primary hover:underline"
									href="/auth/register"
								>
									Register
								</a>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>

			{/* Right side - App Info */}
			<div className="hidden flex-1 items-center justify-center bg-card p-8 lg:flex">
				<div className="max-w-md space-y-8">
					<div className="text-center">
						<h1 className="mb-4 font-bold text-4xl text-foreground">
							Welcome back to WaveDesk
						</h1>
						<p className="mb-8 text-muted-foreground text-xl">
							Sign in and manage your tickets efficiently
						</p>
					</div>

					<div className="space-y-6">
						<div className="flex items-start space-x-4">
							<div className="flex-shrink-0">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
									<Zap className="h-5 w-5 text-foreground" />
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-foreground text-lg">
									Quick Access
								</h3>
								<p className="text-muted-foreground">
									Access your tickets and projects immediately.
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="flex-shrink-0">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
									<Users className="h-5 w-5 text-foreground" />
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-foreground text-lg">
									Team Collaboration
								</h3>
								<p className="text-muted-foreground">
									Work seamlessly with your team.
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="flex-shrink-0">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
									<Shield className="h-5 w-5 text-foreground" />
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-foreground text-lg">
									Secure Login
								</h3>
								<p className="text-muted-foreground">
									Your data is safe and protected with us.
								</p>
							</div>
						</div>
					</div>

					<Separator />

					<div className="text-center">
						<p className="text-muted-foreground text-sm">
							Over 10,000+ companies already trust WaveDesk
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
