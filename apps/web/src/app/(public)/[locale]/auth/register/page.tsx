"use client";

import { useForm } from "@tanstack/react-form";
import { Shield, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import VerificationForm from "@/components/auth/verification-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
	username: z
		.string({
			error: "Username is required",
		})
		.min(3, {
			message: "Username must be at least 3 characters long",
		})
		.max(20, {
			message: "Username must be at most 20 characters long",
		}),
	email: z.email({
		message: "Invalid email address",
	}),
	password: z
		.string({
			error: "Password is required",
		})
		.min(8, {
			message: "Password must be at least 8 characters long",
		})
		.max(100, {
			message: "Password must be at most 100 characters long",
		})
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
			message:
				"Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number",
		}),
});

export default function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const [showVerificationMessage, setShowVerificationMessage] = useState(false);
	const router = useRouter();

	const handleSendOtp = async (email: string) => {
		await authClient.emailOtp.sendVerificationOtp({
			email,
			type: "email-verification",
		});
	};

	const form = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			try {
				const result = await authClient.signUp.email({
					email: value.email,
					password: value.password,
					name: value.username,
				});

				if (result.data) {
					setShowVerificationMessage(true);
					handleSendOtp(value.email);
					toast.success("Registration successful! Please check your emails.");
				} else {
					toast.error(result.error?.message || "Registration failed");
				}
			} catch {
				toast.error("An unexpected error occurred");
			} finally {
				setIsLoading(false);
			}
		},
	});

	if (showVerificationMessage) {
		return (
			<VerificationForm
				email={form.state.values.email}
				onBack={() => setShowVerificationMessage(false)}
				onResend={() => handleSendOtp(form.state.values.email)}
				onSuccess={() => router.push("/auth/login")}
				onVerify={async (otp) => {
					const { data } = await authClient.emailOtp.verifyEmail({
						email: form.state.values.email,
						otp,
					});
					return data?.status ?? false;
				}}
			/>
		);
	}

	return (
		<div className="flex min-h-screen bg-background">
			{/* Left side - Form */}
			<div className="flex flex-1 items-center justify-center p-8">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-center font-bold text-2xl">
							Create Account
						</CardTitle>
						<CardDescription className="text-center">
							Create your WaveDesk account and start today
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
								<Label htmlFor="username">Username</Label>
								<form.Field
									name="username"
									validators={{
										onChange: formSchema.shape.username,
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
												id="username"
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Your username"
												type="text"
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

							<Button className="w-full" disabled={isLoading} type="submit">
								{isLoading ? "Creating..." : "Create Account"}
							</Button>

							<div className="text-center text-muted-foreground text-sm">
								Already have an account?{" "}
								<a className="text-primary hover:underline" href="/auth/login">
									Sign in
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
							Welcome to WaveDesk
						</h1>
						<p className="mb-8 text-muted-foreground text-xl">
							The modern solution for ticket management and customer service
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
									Fast and Efficient
								</h3>
								<p className="text-muted-foreground">
									Manage tickets in real-time and boost your team's
									productivity.
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
									Work seamlessly with your team and share information in
									real-time.
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
									Secure and Reliable
								</h3>
								<p className="text-muted-foreground">
									Your data is safe with us. We use the latest security
									standards.
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
