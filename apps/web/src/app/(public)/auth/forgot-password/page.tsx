"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, CheckCircle, Mail, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

const emailSchema = z.object({
	email: z
		.string({
			error: "Email is required",
		})
		.email({
			message: "Invalid email address",
		}),
});

const otpSchema = z.object({
	otp: z
		.string({
			error: "Verification code is required",
		})
		.length(6, {
			message: "The code must be exactly 6 digits long",
		})
		.regex(/^\d{6}$/, {
			message: "The code can only contain digits",
		}),
});

const passwordSchema = z
	.object({
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
		confirmPassword: z.string({
			error: "Password confirmation is required",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

const passwordFieldSchema = z
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
	});

const confirmPasswordFieldSchema = z.string({
	error: "Password confirmation is required",
});

type Step = "email" | "otp" | "password" | "success";

export default function ForgotPassword() {
	const [currentStep, setCurrentStep] = useState<Step>("email");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const emailForm = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onBlur: emailSchema,
			onChange: emailSchema,
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			try {
				await authClient.emailOtp.sendVerificationOtp({
					email: value.email,
					type: "forget-password",
				});

				setEmail(value.email);
				setCurrentStep("otp");
				toast.success("Email with reset code sent!");
			} catch {
				toast.error("Error sending email");
			} finally {
				setIsLoading(false);
			}
		},
	});

	const otpForm = useForm({
		defaultValues: {
			otp: "",
		},
		validators: {
			onBlur: otpSchema,
			onChange: otpSchema,
		},
		onSubmit: () => {
			setCurrentStep("password");
		},
	});

	const passwordForm = useForm({
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
		validators: {
			onBlur: passwordSchema,
			onChange: passwordSchema,
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			try {
				const result = await authClient.emailOtp.resetPassword({
					email,
					otp: otpForm.state.values.otp,
					password: value.password,
				});

				if (result.data) {
					setCurrentStep("success");
					toast.success("Password changed successfully!");
				} else {
					toast.error(result.error?.message || "Error resetting password");
				}
			} catch {
				toast.error("An unexpected error occurred");
			} finally {
				setIsLoading(false);
			}
		},
	});

	const handleResendOtp = async () => {
		try {
			await authClient.emailOtp.sendVerificationOtp({
				email,
				type: "forget-password",
			});
			toast.success("New email sent!");
		} catch {
			toast.error("Error sending email");
		}
	};

	if (currentStep === "success") {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<CheckCircle className="h-6 w-6 text-foreground" />
						</div>
						<CardTitle className="text-2xl">Password changed!</CardTitle>
						<CardDescription>
							Your password has been successfully reset.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Alert>
							<CheckCircle className="h-4 w-4" />
							<AlertDescription>
								You can now sign in with your new password.
							</AlertDescription>
						</Alert>
						<Button
							className="w-full"
							onClick={() => router.push("/auth/login")}
						>
							Go to Sign In
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-background">
			{/* Left side - Form */}
			<div className="flex flex-1 items-center justify-center p-8">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-center font-bold text-2xl">
							{currentStep === "email" && "Forgot Password"}
							{currentStep === "otp" && "Verify Email"}
							{currentStep === "password" && "New Password"}
						</CardTitle>
						<CardDescription className="text-center">
							{currentStep === "email" &&
								"Enter your email address to reset your password"}
							{currentStep === "otp" &&
								`Enter the 6-digit code we sent to ${email}`}
							{currentStep === "password" &&
								"Choose a new password for your account"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{/* Email Step */}
						{currentStep === "email" && (
							<form
								className="space-y-4"
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									emailForm.handleSubmit();
								}}
							>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<emailForm.Field
										name="email"
										validators={{
											onBlur: emailSchema.shape.email,
											onChange: emailSchema.shape.email,
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
									</emailForm.Field>
								</div>

								<Button className="w-full" disabled={isLoading} type="submit">
									{isLoading ? "Sending..." : "Send Reset Code"}
								</Button>

								<div className="text-center text-muted-foreground text-sm">
									Back to{" "}
									<a
										className="text-primary hover:underline"
										href="/auth/login"
									>
										Sign In
									</a>
								</div>
							</form>
						)}

						{/* OTP Step */}
						{currentStep === "otp" && (
							<form
								className="space-y-4"
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									otpForm.handleSubmit();
								}}
							>
								<div className="space-y-2">
									<Label htmlFor="otp">Verification Code</Label>
									<otpForm.Field
										name="otp"
										validators={{
											onBlur: otpSchema.shape.otp,
											onChange: otpSchema.shape.otp,
										}}
									>
										{(field) => (
											<>
												<Input
													className={`text-center font-mono text-lg tracking-widest ${
														field.state.meta.errors.length > 0
															? "border-destructive"
															: ""
													}`}
													id="otp"
													maxLength={6}
													onBlur={field.handleBlur}
													onChange={(e) => {
														const value = e.target.value
															.replace(/\D/g, "")
															.slice(0, 6);
														field.handleChange(value);
													}}
													placeholder="123456"
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
									</otpForm.Field>
								</div>

								<Button className="w-full" disabled={isLoading} type="submit">
									{isLoading ? "Verifying..." : "Verify Code"}
								</Button>

								<div className="space-y-2 text-center text-muted-foreground text-sm">
									<p>
										Didn't receive an email?{" "}
										<button
											className="text-primary hover:underline"
											onClick={handleResendOtp}
											type="button"
										>
											Send again
										</button>
									</p>
									<Button
										className="w-full"
										onClick={() => setCurrentStep("email")}
										size="sm"
										type="button"
										variant="ghost"
									>
										<ArrowLeft className="mr-2 h-4 w-4" />
										Back
									</Button>
								</div>
							</form>
						)}

						{/* Password Step */}
						{currentStep === "password" && (
							<form
								className="space-y-4"
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									passwordForm.handleSubmit();
								}}
							>
								<div className="space-y-2">
									<Label htmlFor="password">New Password</Label>
									<passwordForm.Field
										name="password"
										validators={{
											onBlur: passwordFieldSchema,
											onChange: passwordFieldSchema,
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
													placeholder="New password"
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
									</passwordForm.Field>
								</div>

								<div className="space-y-2">
									<Label htmlFor="confirmPassword">Confirm Password</Label>
									<passwordForm.Field
										name="confirmPassword"
										validators={{
											onBlur: confirmPasswordFieldSchema,
											onChange: confirmPasswordFieldSchema,
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
													id="confirmPassword"
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Repeat password"
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
									</passwordForm.Field>
								</div>

								<Button className="w-full" disabled={isLoading} type="submit">
									{isLoading ? "Changing..." : "Change Password"}
								</Button>

								<Button
									className="w-full"
									onClick={() => setCurrentStep("otp")}
									size="sm"
									type="button"
									variant="ghost"
								>
									<ArrowLeft className="mr-2 h-4 w-4" />
									Back
								</Button>
							</form>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Right side - App Info */}
			<div className="hidden flex-1 items-center justify-center bg-card p-8 lg:flex">
				<div className="max-w-md space-y-8">
					<div className="text-center">
						<h1 className="mb-4 font-bold text-4xl text-foreground">
							Reset Password
						</h1>
						<p className="mb-8 text-muted-foreground text-xl">
							Don't worry, we'll help you restore your password
						</p>
					</div>

					<div className="space-y-6">
						<div className="flex items-start space-x-4">
							<div className="flex-shrink-0">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
									<Mail className="h-5 w-5 text-foreground" />
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-foreground text-lg">
									Secure Email
								</h3>
								<p className="text-muted-foreground">
									We'll send you a secure code via email.
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
									Verification
								</h3>
								<p className="text-muted-foreground">
									Confirm your identity with the 6-digit code.
								</p>
							</div>
						</div>

						<div className="flex items-start space-x-4">
							<div className="flex-shrink-0">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
									<Zap className="h-5 w-5 text-foreground" />
								</div>
							</div>
							<div>
								<h3 className="font-semibold text-foreground text-lg">
									New Password
								</h3>
								<p className="text-muted-foreground">
									Choose a new, secure password for your account.
								</p>
							</div>
						</div>
					</div>

					<Separator />

					<div className="text-center">
						<p className="text-muted-foreground text-sm">
							Your data is safe and protected with us
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
