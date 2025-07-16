"use client";

import Image from "next/image";

export function Footer() {
	return (
		<footer
			className="relative z-10 mt-8 w-full overflow-hidden pt-16 pb-8"
			id="footer"
		>
			<style global jsx>{`
        .glass {
          backdrop-filter: blur(3px) saturate(180%);
          background: radial-gradient(circle, #fff9 0%, #dce6ff4d 60%, #f2f4f9 100%);
          border: 1px solid #96b4ff1a;
          justify-content: center;
          align-items: center;
          transition: all .3s;
          display: flex;
        }
        .glass:where(.dark, .dark *) {
          display: flex
          backdrop-filter: blur(2px) !important;
          background: radial-gradient(circle, #ffffff1a 0%, #00001e1a 60%, #0e0e2a 100%) !important;
          border: 1px solid #ffffff0d !important;
          border-radius: 16px !important;
          justify-content: center !important;
          align-items: center !important;
        }
      `}</style>
			<div className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full select-none">
				<div className="-top-32 absolute left-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
				<div className="-bottom-24 absolute right-1/4 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
			</div>
			<div className="glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
				<div className="flex flex-col items-center md:items-start">
					<a className="mb-4 flex items-center gap-2" href="/">
						<span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700 font-extrabold text-2xl text-white shadow-md">
							<Image alt="WaveDesk" height={32} src="/logo.png" width={32} />
						</span>
						<span className="bg-gradient-to-br from-blue-200 to-blue-500 bg-clip-text font-semibold text-transparent text-xl tracking-tight">
							WaveDesk
						</span>
					</a>
					<p className="mb-6 max-w-xs text-center text-foreground text-sm md:text-left">
						Professional ticket management for modern companies.
					</p>
					<div className="mt-2 flex gap-3 text-blue-400">
						<a
							aria-label="Twitter"
							className="transition hover:text-foreground"
							href="/"
						>
							{/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
							<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M19.633 7.997c.013.176.013.353.013.53 0 5.387-4.099 11.605-11.604 11.605A11.561 11.561 0 010 18.29c.373.044.734.074 1.12.074a8.189 8.189 0 005.065-1.737 4.102 4.102 0 01-3.834-2.85c.25.04.5.065.765.065.37 0 .734-.049 1.08-.147A4.092 4.092 0 01.8 8.582v-.05a4.119 4.119 0 001.853.522A4.099 4.099 0 01.812 5.847c0-.02 0-.042.002-.062a11.653 11.653 0 008.457 4.287A4.62 4.62 0 0122 5.924a8.215 8.215 0 002.018-.559 4.108 4.108 0 01-1.803 2.268 8.233 8.233 0 002.368-.648 8.897 8.897 0 01-2.062 2.112z" />
							</svg>
						</a>
					</div>
				</div>
				<nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
					<div>
						<div className="mb-3 font-semibold text-blue-400 text-xs uppercase tracking-widest">
							Product
						</div>
						<ul className="space-y-2">
							<li>
								<a className="text-foreground/70" href="#features">
									Features
								</a>
							</li>
							<li>
								<a className="text-foreground/70" href="#pricing">
									Pricing
								</a>
							</li>
						</ul>
					</div>
					<div>
						<div className="mb-3 font-semibold text-blue-400 text-xs uppercase tracking-widest">
							Company
						</div>
						<ul className="space-y-2">
							<li>
								<a className="text-foreground/70" href="/about">
									About
								</a>
							</li>
							<li>
								<a className="text-foreground/70" href="#contact">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<div>
						<div className="mb-3 font-semibold text-blue-400 text-xs uppercase tracking-widest">
							Resources
						</div>
						<ul className="space-y-2">
							<li>
								<a
									className="text-foreground/70"
									href="https://docs.wavedesk.app"
								>
									Docs
								</a>
							</li>
							<li>
								<a
									className="text-foreground/70"
									href="https://discord.gg/wavedesk"
								>
									Community
								</a>
							</li>
							<li>
								<a
									className="text-foreground/70"
									href="https://discord.gg/wavedesk"
								>
									Support
								</a>
							</li>
							<li>
								<a
									className="text-foreground/70"
									href="https://docs.wavedesk.app/security"
								>
									Security
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
			<div className="relative z-10 mt-10 text-center text-foreground text-xs">
				<span>&copy; 2025 WaveDesk. All rights reserved.</span>
			</div>
		</footer>
	);
}
