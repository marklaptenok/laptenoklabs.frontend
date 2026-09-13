export const locales = ['en', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
	en: 'English',
	ru: 'Русский',
};

export const localeShortNames: Record<Locale, string> = {
	en: 'EN',
	ru: 'RU',
};

export const localeTags: Record<Locale, string> = {
	en: 'en',
	ru: 'ru',
};

export const formatLocales: Record<Locale, string> = {
	en: 'en-US',
	ru: 'ru-RU',
};

export const isLocale = (value: unknown): value is Locale =>
	typeof value === 'string' && (locales as readonly string[]).includes(value);
