import { ContactUs } from "@/components/marketing/contact";
import { CTA } from "@/components/marketing/cta";
import { FAQ } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Navbar } from "@/components/marketing/navbar";
import { Pricing } from "@/components/marketing/pricing";

export default function WaveDeskTicketsLanding() {
	return (
		<div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
			{/* Modern gradient background */}
			<div className="fixed inset-0 bg-gradient-to-br from-background via-background to-muted/20">
				<div className="absolute inset-0 bg-[size:60px_60px] bg-grid-foreground/[0.02]" />
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
			</div>

			<div className="relative z-10">
				<Navbar />

				{/* Hero Section */}
				<Hero />

				{/* Features Section */}
				<Features />

				{/* Pricing Section */}
				<Pricing />

				{/* FAQ Section */}
				<FAQ />

				{/* Contact Section */}
				<ContactUs />

				{/* CTA Section */}
				<CTA />

				{/* Footer */}
				<Footer />
			</div>
		</div>
	);
}
