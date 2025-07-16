import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CTA() {
	return (
		<section className="container mx-auto px-4 py-24" id="cta">
			<Card className="mx-auto max-w-4xl border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
				<CardContent className="p-12 text-center">
					<h2 className="mb-6 font-bold text-4xl leading-tight lg:text-5xl">
						Ready for better
						<br />
						<span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
							Ticket Management?
						</span>
					</h2>
					<p className="mx-auto mb-12 max-w-2xl text-muted-foreground text-xl leading-relaxed">
						Start today with WaveDesk Tickets and experience how easy
						professional support management can be.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							className="group rounded-xl bg-primary px-8 py-4 text-lg text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl"
							size="lg"
						>
							Try for free
							<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Button>
						<Button
							className="rounded-xl border-border px-8 py-4 text-lg hover:bg-accent hover:text-accent-foreground"
							size="lg"
							variant="outline"
						>
							Buy Self-Hosted
						</Button>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
