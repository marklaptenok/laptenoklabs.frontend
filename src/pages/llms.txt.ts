import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getSite } from '../utils/consts';
import { locales } from '../i18n/config';
import { useTranslations } from '../i18n/utils';

export const GET: APIRoute = async ({ site }) => {
	const origin = (site ?? new URL('https://laptenoklabs.com')).origin;
	const config = await getSite();
	const t = useTranslations('en');
	const faq = (await getCollection('faq')).find((entry) => entry.id.startsWith('en/'));
	const projects = (await getCollection('projects')).filter((entry) => entry.id.startsWith('en/'));

	const services = [
		[t('services.one.title'), t('services.one.body')],
		[t('services.two.title'), t('services.two.body')],
		[t('services.three.title'), t('services.three.body')],
	];

	const lines = [
		`# ${config.title}`,
		'',
		`> ${t('site.description')} ${t('home.hero.title')}`,
		'',
		`${t('footer.company')}, ${t('footer.ico')}, ${t('footer.address')}. Working languages: English, Russian, Czech.`,
		`Contact: ${t('contact.email')} · mark@laptenoklabs.com · ${t('contact.phone')} · ${t('contact.hours')}.`,
		'',
		'## Services',
		'',
		...services.map(([title, body]) => `- **${title}** — ${body}`),
		'',
		'## Pages',
		'',
		`- [Home](${origin}/en): what the company does, and the teaching figures.`,
		`- [Questions and answers](${origin}/en/faq): the shortest factual description of the company.`,
		`- [Team](${origin}/en/team) and [Mark Laptenok's CV](${origin}/en/team/marklaptenok): who does the work.`,
		`- [Projects](${origin}/en/projects): ${projects.map((entry) => entry.data.title).join('; ')}.`,
		`- [Privacy](${origin}/en/privacy): no cookies, no tracking, no third-party requests.`,
		'',
		'## Frequently asked',
		'',
		...(faq?.data.items ?? []).map((item) => `### ${item.question}\n\n${item.answer}\n`),
		'',
		'## Other languages',
		'',
		...locales.filter((locale) => locale !== 'en').map((locale) => `- ${locale.toUpperCase()}: ${origin}/${locale}`),
		'',
	];

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
