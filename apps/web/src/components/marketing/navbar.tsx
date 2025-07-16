"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { BackendStatus } from "./backend-status";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
	name: string;
	href: string;
	hasDropdown?: boolean;
	dropdownItems?: { name: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
	{ name: "Home", href: "/" },
	{ name: "Features", href: "#features" },
	{ name: "Pricing", href: "#pricing" },
	{ name: "About", href: "/about" },
];

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const { theme } = useTheme();
	const { data: session } = authClient.useSession();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Calculate background color based on theme and scroll state
	const getBackgroundColor = () => {
		if (!isScrolled) {
			return "transparent";
		}
		return theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)";
	};

	const headerVariants = {
		initial: { opacity: 1 },
		animate: { opacity: 1 },
		scrolled: {
			backdropFilter: "blur(20px)",
			backgroundColor:
				theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
			boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
		},
	};

	const mobileMenuVariants = {
		closed: { opacity: 0, height: 0 },
		open: { opacity: 1, height: "auto" },
	};

	const dropdownVariants = {
		hidden: { opacity: 0, y: -10, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
	};

	return (
		<motion.header
			animate={isScrolled ? "scrolled" : "animate"}
			className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
			initial="initial"
			onTransitionEnd={() => {
				// Force re-render when theme changes
			}}
			style={{
				backdropFilter: isScrolled ? "blur(20px)" : "none",
				backgroundColor: getBackgroundColor(),
				boxShadow: isScrolled ? "0 8px 32px rgba(0, 0, 0, 0.1)" : "none",
			}}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			variants={headerVariants}
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between lg:h-20">
					<motion.div
						className="flex items-center space-x-2"
						transition={{ type: "spring", stiffness: 400, damping: 10 }}
						whileHover={{ scale: 1.05 }}
					>
						<Link className="flex items-center space-x-2" href="/">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700">
								<Image alt="WaveDesk" height={32} src="/logo.png" width={32} />
							</div>
							<span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text font-bold text-transparent text-xl">
								WaveDesk
							</span>
						</Link>
					</motion.div>

					<nav className="hidden items-center space-x-8 lg:flex">
						{navItems.map((item) => (
							// biome-ignore lint/a11y/noStaticElementInteractions: not needed
							// biome-ignore lint/nursery/noNoninteractiveElementInteractions: not needed
							<div
								className="relative"
								key={item.name}
								onMouseEnter={() =>
									item.hasDropdown && setActiveDropdown(item.name)
								}
								onMouseLeave={() => setActiveDropdown(null)}
							>
								<Link
									className="flex items-center space-x-1 font-medium text-foreground transition-colors duration-200 hover:text-blue-500"
									href={item.href}
								>
									<span>{item.name}</span>
									{item.hasDropdown && (
										<ChevronDown className="h-4 w-4 transition-transform duration-200" />
									)}
								</Link>

								{item.hasDropdown && (
									<AnimatePresence>
										{activeDropdown === item.name && (
											<motion.div
												animate="visible"
												className="absolute top-full left-0 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-background/95 shadow-xl backdrop-blur-lg"
												exit="hidden"
												initial="hidden"
												transition={{ duration: 0.2 }}
												variants={dropdownVariants}
											>
												{item.dropdownItems?.map((dropdownItem) => (
													<Link
														className="block px-4 py-3 transition-colors duration-200 hover:bg-muted"
														href={dropdownItem.href}
														key={dropdownItem.name}
													>
														<div className="font-medium text-foreground">
															{dropdownItem.name}
														</div>
														{dropdownItem.description && (
															<div className="text-muted-foreground text-sm">
																{dropdownItem.description}
															</div>
														)}
													</Link>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								)}
							</div>
						))}
					</nav>

					<div className="hidden items-center space-x-4 lg:flex">
						<ThemeToggle />
						<BackendStatus />
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link href={session ? "/dashboard" : "/auth/login"}>
								<Button className="group relative overflow-hidden rounded-full bg-primary px-6 text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-primary/30">
									<span className="relative z-10 flex items-center">
										Get Started
										<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
									</span>
									<span className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</Button>
							</Link>
						</motion.div>
					</div>

					<motion.button
						className="rounded-lg p-2 transition-colors duration-200 hover:bg-muted lg:hidden"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						whileTap={{ scale: 0.95 }}
					>
						{isMobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</motion.button>
				</div>

				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							animate="open"
							className="overflow-hidden lg:hidden"
							exit="closed"
							initial="closed"
							transition={{ duration: 0.3, ease: "easeInOut" }}
							variants={mobileMenuVariants}
						>
							<div className="mt-4 space-y-2 rounded-xl border border-border bg-background/95 py-4 shadow-xl backdrop-blur-lg">
								{navItems.map((item) => (
									<Link
										className="block px-4 py-3 font-medium text-foreground transition-colors duration-200 hover:bg-muted"
										href={item.href}
										key={item.name}
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{item.name}
									</Link>
								))}
								<div className="space-y-2 px-4 py-2">
									<Link
										className="block w-full rounded-lg py-2.5 text-center font-medium text-foreground transition-colors duration-200 hover:bg-muted"
										href="/login"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Sign In
									</Link>
									<Link
										className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 py-2.5 text-center font-medium text-white transition-all duration-200 hover:shadow-lg"
										href="/signup"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Get Started
									</Link>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.header>
	);
}
