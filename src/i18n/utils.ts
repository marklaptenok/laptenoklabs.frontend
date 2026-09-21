import { getCollection, type CollectionEntry } from 'astro:content';
import {
	defaultLocale,
	formatLocales,
	isLocale,
	locales,
	type Locale,
} from './config';
import { ui, type TranslationKey } from './ui';

const base = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? '';

export function useTranslations(locale: Locale) {
	return function t(key: TranslationKey, params?: Record<string, string | number>): string {
		const raw = ui[locale]?.[key] ?? ui[defaultLocale][key] ?? key;
		if (!params) return raw;
		return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
			name in params ? String(params[name]) : match,
		);
	};
}

const stripBase = (pathname: string) =>
	base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;

const pathSegments = (pathname: string) => stripBase(pathname).split('/').filter(Boolean);

export function resolveLocale(astro: { params: Record<string, string | undefined>; url: URL }): Locale {
	const fromParam = astro.params.locale;
	if (isLocale(fromParam)) return fromParam;

	const first = pathSegments(astro.url.pathname)[0];
	return isLocale(first) ? first : defaultLocale;
}

export const localePaths = () => locales.map((locale) => ({ params: { locale } }));

export function localeUrl(locale: Locale, path = '/'): string {
	const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
	return clean ? `${base}/${locale}/${clean}` : `${base}/${locale}`;
}

export function switchLocaleUrl(currentPath: string, target: Locale): string {
	const segments = pathSegments(currentPath);
	if (segments.length && isLocale(segments[0])) segments[0] = target;
	else segments.unshift(target);
	return `${base}/${segments.join('/')}`;
}

export const entrySlug = (id: string) => id.replace(/^[a-z]{2}\//, '');

export const projectUrl = (
	locale: Locale,
	entry: { id: string; data: { url?: string } },
) => localeUrl(locale, entry.data.url ?? `/projects/${entrySlug(entry.id)}`);

export const entryLocale = (id: string): Locale => {
	const prefix = id.split('/')[0];
	return isLocale(prefix) ? prefix : defaultLocale;
};

type LocalizedCollection = 'articles' | 'projects' | 'cv' | 'legal' | 'quickmenu';

export async function getLocalizedCollection<C extends LocalizedCollection>(
	collection: C,
	locale: Locale,
): Promise<CollectionEntry<C>[]> {
	const entries = (await getCollection(collection)) as CollectionEntry<C>[];
	const mine = entries.filter((entry) => entryLocale(entry.id) === locale);

	return mine.sort((a, b) => {
		const aDate = (a.data as { pubDate?: Date }).pubDate;
		const bDate = (b.data as { pubDate?: Date }).pubDate;
		if (aDate && bDate) return bDate.valueOf() - aDate.valueOf();
		return 0;
	});
}

async function hasEntry(collection: 'articles' | 'projects', locale: Locale, slug: string) {
	const entries = await getCollection(collection);
	return entries.some((entry) => entry.id === `${locale}/${slug}`);
}

async function hasLocale(collection: LocalizedCollection, locale: Locale) {
	const entries = await getCollection(collection);
	return entries.some((entry) => entryLocale(entry.id) === locale);
}

export const localesWith = (collection: LocalizedCollection) =>
	filterLocales((locale) => hasLocale(collection, locale));


export async function getAvailableLocales(currentPath: string): Promise<Locale[]> {
	const [first, ...rest] = pathSegments(currentPath);
	if (!isLocale(first)) return [];

	const [section, ...tail] = rest;

	if (section === 'articles' && tail.length) {
		const slug = tail.join('/');
		return filterLocales((locale) => hasEntry('articles', locale, slug));
	}

	if (section === 'projects' && tail.length) {
		return filterLocales((locale) => hasEntry('projects', locale, tail.join('/')));
	}

	if (section === 'quickmenu') {
		return localesWith('quickmenu');
	}


	return [...locales];
}

async function filterLocales(predicate: (locale: Locale) => Promise<boolean>): Promise<Locale[]> {
	const checks = await Promise.all(locales.map(predicate));
	return locales.filter((_, index) => checks[index]);
}

export async function alternateUrls(currentPath: string, site: URL | undefined) {
	const origin = site ?? new URL('http://localhost');
	const available = await getAvailableLocales(currentPath);

	const alternates = available.map((locale) => ({
		hreflang: locale as string,
		href: new URL(switchLocaleUrl(currentPath, locale), origin).toString(),
	}));

	if (available.includes(defaultLocale)) {
		alternates.push({
			hreflang: 'x-default',
			href: new URL(switchLocaleUrl(currentPath, defaultLocale), origin).toString(),
		});
	}

	return alternates;
}

export const formatDate = (date: Date, locale: Locale) =>
	date.toLocaleDateString(formatLocales[locale], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

export { defaultLocale, locales, isLocale, formatLocales };
export type { Locale };
