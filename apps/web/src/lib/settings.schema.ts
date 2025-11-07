import { z } from "zod";
import { fonts } from "@/config/fonts";

export const ThemeOptions = ["light", "dark", "system"] as const;
export const LanguageOptions = ["tr", "en", "de"] as const;
export const DirectionOptions = ["ltr", "rtl"] as const;
export const LayoutCollapsibleOptions = ["none", "icon", "offcanvas"] as const;
export const LayoutVariantOptions = ["inset", "sidebar", "floating"] as const;

export const SettingsSchema = z.object({
  theme: z.enum(ThemeOptions),
  language: z.enum(LanguageOptions),
  direction: z.enum(DirectionOptions),
  font: z.enum(fonts as unknown as [string, ...string[]]),
  layout: z.object({
    collapsible: z.enum(LayoutCollapsibleOptions),
    variant: z.enum(LayoutVariantOptions),
  }),
});

export type Settings = z.infer<typeof SettingsSchema>;

export const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  language: "tr",
  direction: "ltr",
  font: fonts[0] ?? "inter",
  layout: {
    collapsible: "icon",
    variant: "inset",
  },
};