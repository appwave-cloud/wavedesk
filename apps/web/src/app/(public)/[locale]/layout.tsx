import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, type Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { locales } from "@/i18n/config";

type Props = {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
	title: "next-intl-mixed-routing (public)",
};

export default async function LocaleLayout({ children, params }: Props) {
	// Ensure that the incoming locale is valid
	const { locale } = await params;
	if (!hasLocale(locales, locale)) {
		notFound();
	}

	// Enable static rendering
	setRequestLocale(locale);

	return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
