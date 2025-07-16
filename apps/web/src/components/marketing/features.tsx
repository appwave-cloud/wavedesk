import { Globe, Lock, Ticket, TrendingUp, Users, Zap } from "lucide-react";

const features = [
	{
		icon: <Ticket className="h-6 w-6" />,
		title: "Smart Ticketing",
		desc: "Automatic categorization and intelligent prioritization for optimal workflow efficiency.",
	},
	{
		icon: <Users className="h-6 w-6" />,
		title: "Team Collaboration",
		desc: "Seamless collaboration between teams with real-time updates and shared workspaces.",
	},
	{
		icon: <TrendingUp className="h-6 w-6" />,
		title: "Analytics & Insights",
		desc: "Detailed insights into performance metrics and customer satisfaction with live dashboards.",
	},
	{
		icon: <Lock className="h-6 w-6" />,
		title: "Enterprise Security",
		desc: "Highest security standards with end-to-end encryption and complete compliance.",
	},
	{
		icon: <Zap className="h-6 w-6" />,
		title: "Automation",
		desc: "Intelligent workflows and automated processes for maximum efficiency and time savings.",
	},
	{
		icon: <Globe className="h-6 w-6" />,
		title: "Integrations",
		desc: "Seamless connection to over 100+ tools and systems for a unified workflow.",
	},
];
export function Features() {
	return (
		<section className="relative py-14" id="features">
			<div className="mx-auto max-w-screen-xl px-4 md:px-8">
				<div className="relative mx-auto max-w-2xl sm:text-center">
					<div className="relative z-10">
						<h3 className="mt-4 font-geist font-normal text-3xl tracking-tighter sm:text-4xl md:text-5xl">
							Thoughtful Features for <br /> Maximum Efficiency
						</h3>
						<p className="mt-3 font-geist text-foreground/60">
							Everything you need for professional ticket management, elegantly
							packaged in an intuitive interface
						</p>
					</div>
					<div
						className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
						style={{
							background:
								"linear-gradient(152.92deg, rgba(99, 102, 241, 0.2) 4.54%, rgba(59, 130, 246, 0.26) 34.2%, rgba(37, 99, 235, 0.1) 77.55%)",
						}}
					/>
				</div>
				<hr className="mx-auto mt-5 h-px w-1/2 bg-foreground/30" />
				<div className="relative mt-12">
					<ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((item) => (
							<li
								className="transform-gpu space-y-3 rounded-xl border bg-transparent p-4 [box-shadow:0_-20px_80px_-20px_rgba(59,130,246,0.18)_inset]"
								key={item.title}
							>
								<div className="w-fit transform-gpu rounded-full border p-4 text-primary [box-shadow:0_-20px_80px_-20px_rgba(59,130,246,0.25)_inset] dark:[box-shadow:0_-20px_80px_-20px_rgba(59,130,246,0.06)_inset]">
									{item.icon}
								</div>
								<h4 className="font-bold font-geist text-lg tracking-tighter">
									{item.title}
								</h4>
								<p className="text-gray-500">{item.desc}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
