import type { locales } from "@/i18n/config";
import messages from "./messages/en.json" with { type: "json" };

declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof locales)[number];
		Messages: typeof messages;
	}
}
