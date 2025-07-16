"use client";

import createGlobe from "cobe";
import type React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EarthProps {
	className?: string;
	theta?: number;
	dark?: number;
	scale?: number;
	diffuse?: number;
	mapSamples?: number;
	mapBrightness?: number;
	baseColor?: [number, number, number];
	markerColor?: [number, number, number];
	glowColor?: [number, number, number];
}
const Earth: React.FC<EarthProps> = ({
	className,
	theta = 0.25,
	dark = 1,
	scale = 1.1,
	diffuse = 1.2,
	mapSamples = 40_000,
	mapBrightness = 6,
	baseColor = [0.2, 0.4, 1],
	markerColor = [0.3, 0.5, 1],
	glowColor = [0.3, 0.5, 1],
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		let width = 0;
		const onResize = () =>
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			canvasRef.current && (width = canvasRef.current.offsetWidth);
		window.addEventListener("resize", onResize);
		onResize();
		let phi = 0;

		onResize();
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		const globe = createGlobe(canvasRef.current!, {
			devicePixelRatio: 2,
			width: width * 2,
			height: width * 2,
			phi: 0,
			theta,
			dark,
			scale,
			diffuse,
			mapSamples,
			mapBrightness,
			baseColor,
			markerColor,
			glowColor,
			opacity: 1,
			offset: [0, 0],
			markers: [
				// longitude latitude
			],
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			onRender: (state: Record<string, any>) => {
				// Called on every animation frame.
				// `state` will be an empty object, return updated params.\
				state.phi = phi;
				phi += 0.003;
			},
		});

		return () => {
			globe.destroy();
		};
	}, [dark]);

	return (
		<div
			className={cn(
				"z-[10] mx-auto flex w-full max-w-[350px] items-center justify-center",
				className
			)}
		>
			<canvas
				ref={canvasRef}
				style={{
					width: "100%",
					height: "100%",
					maxWidth: "100%",
					aspectRatio: "1",
				}}
			/>
		</div>
	);
};

export default Earth;
