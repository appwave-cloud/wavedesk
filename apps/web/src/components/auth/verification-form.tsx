"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, CheckCircle } from "lucide-react";
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

const formSchema = z.object({
	otp: z
		.string({
			error: "Verifizierungscode ist erforderlich",
		})
		.length(6, {
			message: "Der Code muss genau 6 Ziffern lang sein",
		})
		.regex(/^\d{6}$/, {
			message: "Der Code darf nur Ziffern enthalten",
		}),
});

interface VerificationFormProps {
	email: string;
	onBack?: () => void;
	onSuccess?: () => void;
	onVerify?: (otp: string) => Promise<boolean>;
	onResend?: () => Promise<void>;
}

export default function VerificationForm({
	email,
	onBack,
	onSuccess,
	onVerify,
	onResend,
}: VerificationFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);

	const form = useForm({
		defaultValues: {
			otp: "",
		},
		validators: {
			onBlur: formSchema,
			onChange: formSchema,
		},
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			try {
				let success = false;

				if (onVerify) {
					// Use custom verification function if provided
					success = await onVerify(value.otp);
				} else {
					// Mock verification for demo purposes
					// In real implementation, this would call the proper better-auth API
					await new Promise((resolve) => setTimeout(resolve, 1000));
					success = value.otp === "123456"; // Mock success for demo
				}

				if (success) {
					setIsVerified(true);
					toast.success("E-Mail erfolgreich verifiziert!");
					onSuccess?.();
				} else {
					toast.error("Ungültiger Verifizierungscode");
				}
			} catch {
				toast.error("Ein unerwarteter Fehler ist aufgetreten");
			} finally {
				setIsLoading(false);
			}
		},
	});

	if (isVerified) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-background p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<CheckCircle className="h-6 w-6 text-foreground" />
						</div>
						<CardTitle className="text-2xl">
							Verifizierung erfolgreich!
						</CardTitle>
						<CardDescription>
							Dein E-Mail-Konto wurde erfolgreich verifiziert.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Alert>
							<CheckCircle className="h-4 w-4" />
							<AlertDescription>
								Du kannst dich jetzt mit deinem Konto anmelden und alle
								Funktionen nutzen.
							</AlertDescription>
						</Alert>
						<Button
							className="w-full"
							onClick={() => {
								window.location.href = "/auth/login";
							}}
						>
							Zur Anmeldung
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-center font-bold text-2xl">
						E-Mail verifizieren
					</CardTitle>
					<CardDescription className="text-center">
						Gib den 6-stelligen Code ein, den wir an {email} gesendet haben
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
							<Label htmlFor="otp">Verifizierungscode</Label>
							<form.Field
								name="otp"
								validators={{
									onBlur: formSchema.shape.otp,
									onChange: formSchema.shape.otp,
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
												// Nur Zahlen erlauben und auf 6 Zeichen begrenzen
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
							</form.Field>
						</div>

						<Button className="w-full" disabled={isLoading} type="submit">
							{isLoading ? "Verifiziere..." : "Code verifizieren"}
						</Button>

						<div className="space-y-2 text-center text-muted-foreground text-sm">
							<p>
								Keine E-Mail erhalten?{" "}
								<button
									className="text-primary hover:underline"
									onClick={() => {
										onResend?.();
									}}
									type="button"
								>
									Erneut senden
								</button>
							</p>
							{onBack && (
								<Button
									className="w-full"
									onClick={onBack}
									size="sm"
									type="button"
									variant="ghost"
								>
									<ArrowLeft className="mr-2 h-4 w-4" />
									Zurück zur Registrierung
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
