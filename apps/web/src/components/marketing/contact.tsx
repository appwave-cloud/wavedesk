"use client";

import { motion, useInView } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Earth from "@/components/ui/globe";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SparklesCore } from "@/components/ui/sparkles";
import { Textarea } from "@/components/ui/textarea";

export function ContactUs() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const formRef = useRef(null);
	const isInView = useInView(formRef, { once: true, amount: 0.3 });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Perform form submission logic here
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.log("Form submitted:", { name, email, message });
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setName("");
			setEmail("");
			setMessage("");
			setIsSubmitted(true);
			setTimeout(() => {
				setIsSubmitted(false);
			}, 5000);
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error("Error submitting form:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section
			className="relative w-full overflow-hidden bg-background py-16 md:py-24"
			id="contact"
		>
			<div
				className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
				style={{
					background:
						"radial-gradient(circle at center, #3b82f6, transparent 70%)",
				}}
			/>
			<div
				className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
				style={{
					background:
						"radial-gradient(circle at center, #3b82f6, transparent 70%)",
				}}
			/>

			<div className="container relative z-10 mx-auto px-4 md:px-6">
				<div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-border/40 bg-secondary/20 shadow-xl backdrop-blur-sm">
					<div className="grid md:grid-cols-2">
						<div className="relative p-6 md:p-10" ref={formRef}>
							<motion.div
								animate={
									isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								className="flex w-full gap-2"
								initial={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.5, delay: 0.1 }}
							>
								<h2 className="mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text font-bold text-4xl text-transparent tracking-tight md:text-5xl">
									Contact
								</h2>
								<span className="relative z-10 w-full font-bold text-4xl text-primary italic tracking-tight md:text-5xl">
									Us
								</span>
								<SparklesCore
									background="transparent"
									className="absolute inset-0 top-0 h-24 w-full"
									id="tsparticles"
									maxSize={1.4}
									minSize={0.6}
									particleColor="#3b82f6"
									particleDensity={500}
								/>
							</motion.div>

							<motion.form
								animate={
									isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								className="mt-8 space-y-6"
								initial={{ opacity: 0, y: 20 }}
								onSubmit={handleSubmit}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
									<motion.div
										animate={{ opacity: 1, y: 0 }}
										className="space-y-2"
										initial={{ opacity: 0, y: 10 }}
										transition={{ delay: 0.4 }}
									>
										<Label htmlFor="name">Name</Label>
										<Input
											id="name"
											onChange={(e) => setName(e.target.value)}
											placeholder="Enter your name"
											required
											value={name}
										/>
									</motion.div>

									<motion.div
										animate={{ opacity: 1, y: 0 }}
										className="space-y-2"
										initial={{ opacity: 0, y: 10 }}
										transition={{ delay: 0.5 }}
									>
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											onChange={(e) => setEmail(e.target.value)}
											placeholder="Enter your email"
											required
											type="email"
											value={email}
										/>
									</motion.div>
								</div>

								<motion.div
									animate={{ opacity: 1, y: 0 }}
									className="space-y-2"
									initial={{ opacity: 0, y: 10 }}
									transition={{ delay: 0.6 }}
								>
									<Label htmlFor="message">Message</Label>
									<Textarea
										className="h-40 resize-none"
										id="message"
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Enter your message"
										required
										value={message}
									/>
								</motion.div>

								<motion.div
									className="w-full"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button
										className="w-full bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]"
										disabled={isSubmitting}
										type="submit"
									>
										{isSubmitting ? (
											<span className="flex items-center justify-center">
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Sending...
											</span>
											// biome-ignore lint/style/noNestedTernary: <explanation>
										) : isSubmitted ? (
											<span className="flex items-center justify-center">
												<Check className="mr-2 h-4 w-4" />
												Message Sent!
											</span>
										) : (
											<span>Send Message</span>
										)}
									</Button>
								</motion.div>
							</motion.form>
						</div>

						<motion.div
							animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
							className="relative my-8 flex items-center justify-center overflow-hidden pr-8"
							initial={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							<div className="flex flex-col items-center justify-center overflow-hidden">
								<article className="relative mx-auto h-[350px] min-h-60 max-w-[450px] overflow-hidden rounded-3xl border bg-gradient-to-b from-[#3b82f6] to-[#3b82f6]/5 p-6 text-3xl text-white tracking-tight md:h-[450px] md:min-h-80 md:p-8 md:text-4xl md:leading-[1.05] lg:text-5xl">
									Presenting you with the best UI possible.
									<div className="-bottom-20 -right-20 md:-bottom-28 md:-right-28 absolute z-10 mx-auto flex h-full w-full max-w-[300px] items-center justify-center transition-all duration-700 hover:scale-105 md:max-w-[550px]">
										<Earth
											baseColor={[0.2, 0.4, 1]}
											glowColor={[0.3, 0.5, 1]}
											markerColor={[0, 0, 0]}
											scale={1.1}
										/>
									</div>
								</article>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
