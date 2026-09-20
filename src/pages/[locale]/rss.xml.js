import rss from '@astrojs/rss';
import { getSite } from '../../utils/consts';
import { locales } from '../../i18n/config';
import { entrySlug, getLocalizedCollection, localeUrl, useTranslations } from '../../i18n/utils';

export const getStaticPaths = () => locales.map((locale) => ({ params: { locale } }));

export async function GET(context) {
	const locale = context.params.locale;
	const t = useTranslations(locale);
	const site = await getSite();
	const posts = await getLocalizedCollection('articles', locale);

	return rss({
		title: `${site.title} — ${t('articles.title')}`,
		description: t('site.description'),
		site: context.site,
		customData: `<language>${locale}</language>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: localeUrl(locale, `/articles/${entrySlug(post.id)}`),
		})),
	});
}
