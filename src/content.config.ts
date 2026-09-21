import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
		}),
});


const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).default([]),
			url: z.string().startsWith('/').optional(),
		}),
});

const quickmenu = defineCollection({
	loader: glob({ base: './src/content/quickmenu', pattern: '**/*.yml' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			heading: z.string(),
			tagline: z.string(),
			photo: image(),
			groups: z.array(
				z.object({
					items: z.array(
						z.object({
							title: z.string(),
							description: z.string().optional(),
							href: z.string(),
						}),
					),
				}),
			),
		}),
});

const legal = defineCollection({
	loader: glob({ base: './src/content/legal', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updatedDate: z.coerce.date(),
	}),
});

const cv = defineCollection({
	loader: glob({ base: './src/content/cv', pattern: '**/*.yml' }),
	schema: ({ image }) => z.object({
		name: z.string(),
		altName: z.string(),
		role: z.string(),
		photo: image(),
		headline: z.string(),
		knowsAbout: z.array(z.string()).default([]),
		contacts: z.array(z.string()),
		sections: z.array(
			z.object({
				title: z.string(),
				entries: z.array(
					z.object({
						org: z.string().optional(),
						location: z.string().optional(),
						href: z.string().optional(),
						roles: z.array(z.string()).default([]),
						notes: z.array(z.string()).default([]),
					}),
				),
			}),
		),
	}),
});

const site = defineCollection({
	loader: file('src/site-config.yml'),
	schema: z.object({
		title: z.string(),
		profiles: z.array(z.string()).default([]),
	}),
});

const faq = defineCollection({
	loader: glob({ base: './src/content/faq', pattern: '**/*.yml' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		intro: z.string(),
		items: z.array(z.object({ question: z.string(), answer: z.string() })),
	}),
});

export const collections = { articles, cv, faq, legal, projects, quickmenu, site };
