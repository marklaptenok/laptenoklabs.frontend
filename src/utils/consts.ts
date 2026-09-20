// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { getEntry } from 'astro:content';

export async function getSite() {
	const entry = await getEntry('site', 'site');
	return {
		title: entry?.data.title ?? 'Laptenok Labs',
	};
}
