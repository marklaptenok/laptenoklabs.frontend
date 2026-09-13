import type { Locale } from './config';

const en = {
	'site.description': 'Software engineering. Building, maintaining, and teaching it.',
	'site.skipToContent': 'Skip to content',

	'nav.home': 'Home',
	'nav.blog': 'Blog',
	'nav.team': 'Team',
	'nav.about': 'About',
	'nav.projects': 'Projects',
	'nav.tags': 'Tags',
	'nav.rss': 'RSS',
	'nav.toggle': 'Toggle navigation',

	'header.search': 'Search',
	'header.github': 'Visit the GitHub profile',
	'header.debug': 'Toggle layout borders',
	'header.theme': 'Toggle theme',
	'header.language': 'Change language',
	'header.languageCurrent': 'Current language: {language}',

	'lang.en': 'English',
	'lang.ru': 'Русский',

	'search.title': 'Search',
	'search.open': 'Open search dialog',
	'search.heading': 'Find anything on the site',
	'search.close': 'Close search dialog',
	'search.footnote': 'Powered by Pagefind. Start typing to search posts, pages, and profiles.',
	'pagefind.placeholder': 'Search the site',
	'pagefind.clear_search': 'Clear',
	'pagefind.load_more': 'Load more results',
	'pagefind.search_label': 'Search this site',
	'pagefind.filters_label': 'Filters',
	'pagefind.zero_results': 'No results for [SEARCH_TERM]',
	'pagefind.many_results': '[COUNT] results for [SEARCH_TERM]',
	'pagefind.one_result': '[COUNT] result for [SEARCH_TERM]',
	'pagefind.alt_search': 'No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead',
	'pagefind.search_suggestion': 'No results for [SEARCH_TERM]. Try one of the following searches:',
	'pagefind.searching': 'Searching for [SEARCH_TERM]…',

	'footer.resources': 'Resources',
	'footer.connect': 'Connect',
	'footer.navigation': 'Navigation',
	'footer.rights': 'All rights reserved.',
	'footer.based': 'Pilsen, Czech Republic',
	'footer.designedBy': 'Built on the Astro Launchpad template by Rodrigo Cortez.',

	'social.github': 'GitHub',
	'social.linkedin': 'LinkedIn',
	'social.email': 'Email',

	'home.hero.eyebrow': 'An Astro Blueprint',
	'home.hero.title': 'A modern Astro scaffolding for agencies and studios.',
	'home.hero.description':
		'Kickstart your next project with a solid foundation, featuring a blog, project showcases, and dark mode support.',
	'home.hero.actionBlog': 'View Blog',
	'home.hero.actionContact': 'Get in touch',

	'home.numbers.eyebrow': 'Results',
	'home.numbers.title': 'We deliver consistently',
	'home.numbers.copy':
		'A design-and-code stack ready to ship products without trading off quality.',
	'home.numbers.projects.label': 'Projects shipped',
	'home.numbers.projects.description': 'From discovery to ship without drama.',
	'home.numbers.leadTime.label': 'Average lead time',
	'home.numbers.leadTime.value': '6 weeks',
	'home.numbers.leadTime.description': 'Small teams, short cycles.',
	'home.numbers.nps.label': 'Client NPS',
	'home.numbers.nps.description': 'Long-term relationships.',
	'home.numbers.response.label': 'Response time',
	'home.numbers.response.description': 'Slack, email, or call.',

	'home.testimonials.eyebrow': 'Testimonials',
	'home.testimonials.title': 'What our clients say',
	'home.testimonials.previous': 'Previous testimonial',
	'home.testimonials.next': 'Next testimonial',
	'home.testimonials.goTo': 'Go to testimonial {number}',

	'values.eyebrow': 'Values',
	'values.title': 'How we show up',
	'values.copy':
		'Principles we keep front-and-center so every project ships with the same intent and craft.',
	'values.clarity.title': 'Clarity over noise',
	'values.clarity.description':
		'We write, design, and code to be understood quickly by teams and customers.',
	'values.shipping.title': 'Bias for shipping',
	'values.shipping.description':
		'We prefer small, validated releases over long bets that never reach users.',
	'values.craft.title': 'Craft with pragmatism',
	'values.craft.description':
		'Quality matters most when it serves the outcome — polish meets purpose.',
	'values.partnership.title': 'Partnership mindset',
	'values.partnership.description':
		'We behave like embedded teammates, not vendors: transparent, responsive, reliable.',

	'about.title': 'About',
	'about.eyebrow': 'Studio',
	'about.description': 'We shape product, brand, and code for mission-driven teams.',
	'about.lead':
		'We are a compact, senior studio blending research, design, and engineering to ship resilient products.',
	'about.body1':
		'We stay close to the people using what we build: quick interviews, async notes, and instrumented releases. Decisions stay traceable so teams know why something shipped, not just what shipped.',
	'about.body2':
		'When we embed with clients, we bring our own delivery discipline — strong briefs, scoped milestones, and demos that keep stakeholders aligned. The goal: fewer surprises, faster learning.',

	'team.title': 'Team',
	'team.eyebrow': 'Team',
	'team.heading': 'Meet the people behind the work',
	'team.description':
		'A compact, senior team that blends research, design, and engineering to ship resilient products.',
	'team.empty': 'No profiles published yet.',

	'blog.title': 'Blog',
	'blog.eyebrow': 'Some thoughts',
	'blog.heading': 'Blog',
	'blog.description': 'Stories and more about development',
	'blog.viewAll': 'View all posts',
	'blog.empty': 'No posts published yet.',
	'blog.readingIn': 'Written in {language}',
	'blog.postEyebrow': 'Journal',
	'blog.updated': 'Updated',

	'projects.title': 'Projects',
	'projects.eyebrow': 'Projects',
	'projects.heading': 'Product stories and recent experiences',
	'projects.description':
		'Sharing results, learnings, and design structures that power creative and technical teams.',
	'projects.metaDescription': 'Explore case studies and recent builds.',
	'projects.empty': 'No projects published yet.',
	'projects.postEyebrow': 'Project',

	'tags.title': 'Tags',
	'tags.eyebrow': 'Tags',
	'tags.heading': 'Browse by topic',
	'tags.description': 'Explore every available tag and the posts filed under it.',
	'tags.metaDescription': 'Browse posts by tag.',
	'tags.empty': 'No tags yet.',
	'tags.single': 'Tag',
	'tags.taggedWith': 'Posts filed under this tag.',
	'tags.taggedWithDescription': 'Posts tagged {tag}',
	'tags.noPosts': 'No posts carry this tag.',

	'notFound.title': 'Page not found',
	'notFound.badge': 'Lost in the grid',
	'notFound.heading': 'We couldn’t find that page.',
	'notFound.description':
		'The link may be broken or the page might have moved. Pick a route below to keep moving.',
	'notFound.home': 'Back to home',
	'notFound.blog': 'View the blog',
} as const;

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
	'site.description': 'Программная инженерия. Разрабатываю, поддерживаю и учу ей.',
	'site.skipToContent': 'Перейти к содержимому',

	'nav.home': 'Главная',
	'nav.blog': 'Блог',
	'nav.team': 'Команда',
	'nav.about': 'Обо мне',
	'nav.projects': 'Проекты',
	'nav.tags': 'Теги',
	'nav.rss': 'RSS',
	'nav.toggle': 'Открыть меню',

	'header.search': 'Поиск',
	'header.github': 'Профиль на GitHub',
	'header.debug': 'Показать границы вёрстки',
	'header.theme': 'Сменить тему',
	'header.language': 'Сменить язык',
	'header.languageCurrent': 'Текущий язык: {language}',

	'lang.en': 'English',
	'lang.ru': 'Русский',

	'search.title': 'Поиск',
	'search.open': 'Открыть поиск',
	'search.heading': 'Найти что угодно на сайте',
	'search.close': 'Закрыть поиск',
	'search.footnote': 'Работает на Pagefind. Начните вводить запрос, чтобы искать по записям, страницам и профилям.',
	'pagefind.placeholder': 'Искать по сайту',
	'pagefind.clear_search': 'Очистить',
	'pagefind.load_more': 'Показать ещё',
	'pagefind.search_label': 'Поиск по сайту',
	'pagefind.filters_label': 'Фильтры',
	'pagefind.zero_results': 'По запросу [SEARCH_TERM] ничего не найдено',
	'pagefind.many_results': 'Результатов по запросу [SEARCH_TERM]: [COUNT]',
	'pagefind.one_result': 'Результатов по запросу [SEARCH_TERM]: [COUNT]',
	'pagefind.alt_search': 'По запросу [SEARCH_TERM] ничего не найдено. Показаны результаты для [DIFFERENT_TERM]',
	'pagefind.search_suggestion': 'По запросу [SEARCH_TERM] ничего не найдено. Попробуйте один из вариантов:',
	'pagefind.searching': 'Идёт поиск: [SEARCH_TERM]…',

	'footer.resources': 'Материалы',
	'footer.connect': 'Связаться',
	'footer.navigation': 'Навигация',
	'footer.rights': 'Все права защищены.',
	'footer.based': 'Пльзень, Чехия',
	'footer.designedBy': 'Сделано на шаблоне Astro Launchpad, автор — Rodrigo Cortez.',

	'social.github': 'GitHub',
	'social.linkedin': 'LinkedIn',
	'social.email': 'Почта',

	'home.hero.eyebrow': 'Шаблон на Astro',
	'home.hero.title': 'Современный каркас на Astro для агентств и студий.',
	'home.hero.description':
		'Начните следующий проект с прочного основания: блог, витрина проектов и поддержка тёмной темы.',
	'home.hero.actionBlog': 'Читать блог',
	'home.hero.actionContact': 'Написать мне',

	'home.numbers.eyebrow': 'Результаты',
	'home.numbers.title': 'Мы делаем работу стабильно',
	'home.numbers.copy':
		'Связка дизайна и кода, готовая выпускать продукты без потери качества.',
	'home.numbers.projects.label': 'Выпущено проектов',
	'home.numbers.projects.description': 'От исследования до релиза без лишней драмы.',
	'home.numbers.leadTime.label': 'Средний срок',
	'home.numbers.leadTime.value': '6 недель',
	'home.numbers.leadTime.description': 'Небольшие команды, короткие циклы.',
	'home.numbers.nps.label': 'NPS клиентов',
	'home.numbers.nps.description': 'Долгие отношения.',
	'home.numbers.response.label': 'Время ответа',
	'home.numbers.response.description': 'Slack, почта или звонок.',

	'home.testimonials.eyebrow': 'Отзывы',
	'home.testimonials.title': 'Что говорят клиенты',
	'home.testimonials.previous': 'Предыдущий отзыв',
	'home.testimonials.next': 'Следующий отзыв',
	'home.testimonials.goTo': 'Перейти к отзыву {number}',

	'values.eyebrow': 'Принципы',
	'values.title': 'Как мы работаем',
	'values.copy':
		'Принципы, которые всегда на виду, чтобы каждый проект выходил с одним и тем же замыслом и качеством.',
	'values.clarity.title': 'Ясность вместо шума',
	'values.clarity.description':
		'Мы пишем, проектируем и программируем так, чтобы команды и клиенты понимали быстро.',
	'values.shipping.title': 'Склонность выпускать',
	'values.shipping.description':
		'Небольшие проверенные релизы лучше долгих ставок, которые не доходят до пользователя.',
	'values.craft.title': 'Мастерство с прагматизмом',
	'values.craft.description':
		'Качество важнее всего тогда, когда оно работает на результат: отделка встречается с целью.',
	'values.partnership.title': 'Партнёрство',
	'values.partnership.description':
		'Мы ведём себя как часть команды, а не как подрядчик: прозрачно, отзывчиво, надёжно.',

	'about.title': 'Обо мне',
	'about.eyebrow': 'Студия',
	'about.description': 'Мы формируем продукт, бренд и код для команд с миссией.',
	'about.lead':
		'Мы — компактная студия сильных специалистов, соединяющая исследование, дизайн и инженерию, чтобы выпускать устойчивые продукты.',
	'about.body1':
		'Мы держимся рядом с теми, кто пользуется тем, что мы делаем: короткие интервью, асинхронные заметки, релизы с телеметрией. Решения остаются прослеживаемыми, поэтому команда знает не только что вышло, но и почему.',
	'about.body2':
		'Встраиваясь в команду клиента, мы приносим свою дисциплину поставки: внятные постановки, размеченные вехи и демонстрации, которые держат всех заинтересованных в одной картине. Цель — меньше сюрпризов, быстрее выводы.',

	'team.title': 'Команда',
	'team.eyebrow': 'Команда',
	'team.heading': 'Люди, которые делают работу',
	'team.description':
		'Компактная команда сильных специалистов, соединяющая исследование, дизайн и инженерию.',
	'team.empty': 'Профили пока не опубликованы.',

	'blog.title': 'Блог',
	'blog.eyebrow': 'Мысли',
	'blog.heading': 'Блог',
	'blog.description': 'Истории и заметки о разработке',
	'blog.viewAll': 'Все записи',
	'blog.empty': 'Записей пока нет.',
	'blog.readingIn': 'Написано на языке: {language}',
	'blog.postEyebrow': 'Журнал',
	'blog.updated': 'Обновлено',

	'projects.title': 'Проекты',
	'projects.eyebrow': 'Проекты',
	'projects.heading': 'Истории продуктов и недавний опыт',
	'projects.description':
		'Результаты, выводы и проектные решения, на которых держатся творческие и технические команды.',
	'projects.metaDescription': 'Разборы проектов и недавние работы.',
	'projects.empty': 'Проекты пока не опубликованы.',
	'projects.postEyebrow': 'Проект',

	'tags.title': 'Теги',
	'tags.eyebrow': 'Теги',
	'tags.heading': 'Поиск по темам',
	'tags.description': 'Все доступные теги и записи, собранные под ними.',
	'tags.metaDescription': 'Записи по тегам.',
	'tags.empty': 'Тегов пока нет.',
	'tags.single': 'Тег',
	'tags.taggedWith': 'Записи с этим тегом.',
	'tags.taggedWithDescription': 'Записи с тегом {tag}',
	'tags.noPosts': 'С этим тегом пока нет записей.',

	'notFound.title': 'Страница не найдена',
	'notFound.badge': 'Потерялись в сетке',
	'notFound.heading': 'Такую страницу найти не удалось.',
	'notFound.description':
		'Возможно, ссылка сломана или страница переехала. Выберите, куда двигаться дальше.',
	'notFound.home': 'На главную',
	'notFound.blog': 'В блог',
};

export const ui: Record<Locale, Record<TranslationKey, string>> = { en, ru };
