import type { Locale } from './config';

const en = {
	'site.description': 'I build systems software and teach software engineering.',
	'site.skipToContent': 'Skip to content',

	'nav.home': 'Home',
	'nav.blog': 'Blog',
	'nav.about': 'About',
	'nav.projects': 'Projects',
	'nav.tags': 'Tags',
	'nav.rss': 'RSS',
	'nav.primary': 'Main navigation',

	'header.search': 'Search',
	'header.debug': 'Toggle layout borders',
	'header.language': 'Change language',

	'lang.en': 'English',
	'lang.ru': 'Русский',

	'search.title': 'Search',
	'search.open': 'Open search dialog',
	'search.heading': 'Find anything on the site',
	'search.close': 'Close search dialog',
	'search.footnote': 'Powered by Pagefind. Start typing to search posts and pages.',
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

	'footer.connect': 'Connect',
	'footer.navigation': 'Navigation',
	'footer.rights': 'All rights reserved.',
	'footer.based': 'Pilsen, Czech Republic',
	'footer.colophon': 'Built with Astro on the Launchpad template by Rodrigo Cortez.',

	'social.github': 'GitHub',
	'social.linkedin': 'LinkedIn',
	'social.email': 'Email',

	'home.hero.eyebrow': 'Software engineer · Teacher',
	'home.hero.title': 'Communication between computer systems — and between the people who build them.',
	'home.hero.description':
		'I am Mark Laptenok. I engineer systems software in Pilsen, Czech Republic, and I have taught software engineering since 2019. My background is applied mathematics and systems programming; my interests are kernel-mode programming and distributed operating systems.',
	'home.hero.actionBlog': 'Read the blog',
	'home.hero.actionAbout': 'More about me',

	'home.numbers.eyebrow': 'Teaching',
	'home.numbers.title': 'Teaching, in numbers',
	'home.numbers.copy': 'Laptenok Labs, since March 2019. Figures as of 1 September 2026.',
	'home.numbers.hours.value': '4,525',
	'home.numbers.hours.label': 'Hours of classes',
	'home.numbers.hours.description':
		'Computer networks, operating systems, databases, algorithms, parallel computing.',
	'home.numbers.people.value': '172',
	'home.numbers.people.label': 'People tutored',
	'home.numbers.people.description':
		'Including interns and students of Imperial College London, the universities of Bremen and Auckland, and Moscow State University.',
	'home.numbers.since.value': '2019',
	'home.numbers.since.label': 'Teaching since',
	'home.numbers.since.description': 'Alongside full-time engineering work.',

	'focus.eyebrow': 'Focus',
	'focus.title': 'What I work on',
	'focus.copy': 'Three kinds of communication, and the systems programming underneath them.',
	'focus.systems.title': 'Communication between systems',
	'focus.systems.description':
		'Protocol design, data serialisation, and resilience — the core of my engineering work in banking, retail, and desktop clients.',
	'focus.people.title': 'Communication between people',
	'focus.people.description':
		'Cross-team and customer–engineer communication: turning what one side needs into something the other can build.',
	'focus.kernel.title': 'Systems programming',
	'focus.kernel.description':
		'Kernel-mode programming and distributed operating systems. I am currently writing one for the BCM2711 SoC in Rust.',
	'focus.teaching.title': 'Teaching',
	'focus.teaching.description':
		'Computer networks, operating systems, databases, algorithms and data structures, parallel computing, discrete mathematics.',

	'about.title': 'About',
	'about.eyebrow': 'About',
	'about.description':
		'Mark Laptenok — software engineer and engineering teacher in Pilsen, Czech Republic.',
	'about.lead':
		'A communicator and a technical leader with a fundamental background in applied mathematics and systems programming.',
	'about.body1':
		'My main engineering expertise is communication among computer systems: protocol design, data serialisation, and resilience. Since January 2026 I have been a Senior Software Engineer at Microsoft, working on the reliability of the Teams desktop client. Before that I spent three years at Diebold Nixdorf on communication stacks for banking and retail, and two years at Silixcon on systems for motor controllers.',
	'about.body2':
		'Since March 2019 I have taught software engineering as Laptenok Labs: computer networks, operating systems, databases, algorithms and data structures, parallel computing, probability theory and discrete mathematics. By 1 September 2026 that came to 4,525 hours of classes with 172 people.',
	'about.body3':
		'I studied at the Faculty of Mathematics, Mechanics and Computer Sciences of the Southern Federal University in Rostov-on-Don, qualifying as a mathematician and systems programmer. I speak Russian, English and Czech, and write C, C++, Rust and Go.',
	'about.motto': 'Make people benefit from Computer Science.',
	'about.disclaimer':
		'Employers are named here as a matter of record. This site is my own: it is not affiliated with, sponsored by, or endorsed by any of them.',
	'about.photoAlt': 'Mark Laptenok',

	'blog.title': 'Blog',
	'blog.eyebrow': 'Writing',
	'blog.heading': 'Blog',
	'blog.description': 'Notes on software engineering.',
	'blog.viewAll': 'All posts',
	'blog.empty': 'No posts published yet.',
	'blog.postEyebrow': 'Post',
	'blog.updated': 'Updated',

	'projects.title': 'Projects',
	'projects.eyebrow': 'Projects',
	'projects.heading': 'Things I build',
	'projects.description': 'Work and side projects I can write about.',
	'projects.metaDescription': 'Projects by Mark Laptenok.',
	'projects.empty': 'No projects published yet.',
	'projects.postEyebrow': 'Project',

	'tags.title': 'Tags',
	'tags.eyebrow': 'Tags',
	'tags.heading': 'Browse by topic',
	'tags.description': 'Every tag in use, and the posts filed under it.',
	'tags.metaDescription': 'Browse posts by tag.',
	'tags.empty': 'No tags yet.',
	'tags.single': 'Tag',
	'tags.taggedWith': 'Posts filed under this tag.',
	'tags.taggedWithDescription': 'Posts tagged {tag}',
	'tags.noPosts': 'No posts carry this tag.',

	'notFound.title': 'Page not found',
	'notFound.heading': 'That page could not be found.',
	'notFound.description':
		'The link may be broken, or the page may have moved. Pick a route below to keep going.',
	'notFound.home': 'Back to home',
	'notFound.blog': 'Go to the blog',
} as const;

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
	'site.description': 'Разрабатываю системное ПО и преподаю программную инженерию.',
	'site.skipToContent': 'Перейти к содержимому',

	'nav.home': 'Главная',
	'nav.blog': 'Блог',
	'nav.about': 'Обо мне',
	'nav.projects': 'Проекты',
	'nav.tags': 'Теги',
	'nav.rss': 'RSS',
	'nav.primary': 'Основная навигация',

	'header.search': 'Поиск',
	'header.debug': 'Показать границы вёрстки',
	'header.language': 'Сменить язык',

	'lang.en': 'English',
	'lang.ru': 'Русский',

	'search.title': 'Поиск',
	'search.open': 'Открыть поиск',
	'search.heading': 'Найти что угодно на сайте',
	'search.close': 'Закрыть поиск',
	'search.footnote': 'Работает на Pagefind. Начните вводить запрос, чтобы искать по записям и страницам.',
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

	'footer.connect': 'Связаться',
	'footer.navigation': 'Навигация',
	'footer.rights': 'Все права защищены.',
	'footer.based': 'Пльзень, Чехия',
	'footer.colophon': 'Сделано на Astro, шаблон Launchpad, автор — Rodrigo Cortez.',

	'social.github': 'GitHub',
	'social.linkedin': 'LinkedIn',
	'social.email': 'Почта',

	'home.hero.eyebrow': 'Инженер-программист · Преподаватель',
	'home.hero.title': 'Коммуникация между компьютерными системами — и между людьми, которые их создают.',
	'home.hero.description':
		'Меня зовут Марк Лаптёнок. Я разрабатываю системное программное обеспечение в Пльзене, Чехия, и с 2019 года преподаю программную инженерию. В основе — прикладная математика и системное программирование; интересуюсь программированием в режиме ядра и распределёнными операционными системами.',
	'home.hero.actionBlog': 'Читать блог',
	'home.hero.actionAbout': 'Подробнее обо мне',

	'home.numbers.eyebrow': 'Преподавание',
	'home.numbers.title': 'Преподавание в цифрах',
	'home.numbers.copy': 'Laptenok Labs, с марта 2019 года. Данные на 1 сентября 2026 года.',
	'home.numbers.hours.value': '4 525',
	'home.numbers.hours.label': 'Часов занятий',
	'home.numbers.hours.description':
		'Компьютерные сети, операционные системы, базы данных, алгоритмы, параллельные вычисления.',
	'home.numbers.people.value': '172',
	'home.numbers.people.label': 'Человек обучено',
	'home.numbers.people.description':
		'В том числе стажёры и студенты Imperial College London, университетов Бремена и Окленда, МГУ.',
	'home.numbers.since.value': '2019',
	'home.numbers.since.label': 'Преподаю с',
	'home.numbers.since.description': 'Параллельно с основной инженерной работой.',

	'focus.eyebrow': 'Направления',
	'focus.title': 'Чем я занимаюсь',
	'focus.copy': 'Три вида коммуникации и системное программирование под ними.',
	'focus.systems.title': 'Коммуникация между системами',
	'focus.systems.description':
		'Проектирование протоколов, сериализация данных и отказоустойчивость — основа моей инженерной работы в банковской сфере, ритейле и настольных клиентах.',
	'focus.people.title': 'Коммуникация между людьми',
	'focus.people.description':
		'Общение между командами и между заказчиком и инженером: превращаю то, что нужно одной стороне, в то, что может построить другая.',
	'focus.kernel.title': 'Системное программирование',
	'focus.kernel.description':
		'Программирование в режиме ядра и распределённые операционные системы. Сейчас пишу такую для SoC BCM2711 на Rust.',
	'focus.teaching.title': 'Преподавание',
	'focus.teaching.description':
		'Компьютерные сети, операционные системы, базы данных, алгоритмы и структуры данных, параллельные вычисления, дискретная математика.',

	'about.title': 'Обо мне',
	'about.eyebrow': 'Обо мне',
	'about.description':
		'Марк Лаптёнок — инженер-программист и преподаватель программной инженерии, Пльзень, Чехия.',
	'about.lead':
		'Коммуникатор и технический лидер с фундаментальной базой в прикладной математике и системном программировании.',
	'about.body1':
		'Моя основная инженерная специализация — коммуникация между компьютерными системами: проектирование протоколов, сериализация данных и отказоустойчивость. С января 2026 года работаю старшим инженером-программистом в Microsoft над надёжностью настольного клиента Teams. До этого три года занимался коммуникационными стеками для банков и ритейла в Diebold Nixdorf и два года — системами для контроллеров двигателей в Silixcon.',
	'about.body2':
		'С марта 2019 года преподаю программную инженерию под маркой Laptenok Labs: компьютерные сети, операционные системы, базы данных, алгоритмы и структуры данных, параллельные вычисления, теорию вероятностей и дискретную математику. К 1 сентября 2026 года это 4 525 часов занятий со 172 людьми.',
	'about.body3':
		'Учился на факультете математики, механики и компьютерных наук Южного федерального университета в Ростове-на-Дону, квалификация — математик, системный программист. Говорю по-русски, по-английски и по-чешски, пишу на C, C++, Rust и Go.',
	'about.motto': 'Сделать так, чтобы информатика приносила людям пользу.',
	'about.disclaimer':
		'Работодатели названы здесь для точности изложения. Сайт мой собственный: он не связан с ними, не спонсируется и не одобряется ими.',
	'about.photoAlt': 'Марк Лаптёнок',

	'blog.title': 'Блог',
	'blog.eyebrow': 'Записи',
	'blog.heading': 'Блог',
	'blog.description': 'Заметки о программной инженерии.',
	'blog.viewAll': 'Все записи',
	'blog.empty': 'Записей пока нет.',
	'blog.postEyebrow': 'Запись',
	'blog.updated': 'Обновлено',

	'projects.title': 'Проекты',
	'projects.eyebrow': 'Проекты',
	'projects.heading': 'Что я делаю',
	'projects.description': 'Рабочие и личные проекты, о которых можно рассказать.',
	'projects.metaDescription': 'Проекты Марка Лаптёнка.',
	'projects.empty': 'Проекты пока не опубликованы.',
	'projects.postEyebrow': 'Проект',

	'tags.title': 'Теги',
	'tags.eyebrow': 'Теги',
	'tags.heading': 'Поиск по темам',
	'tags.description': 'Все используемые теги и записи под ними.',
	'tags.metaDescription': 'Записи по тегам.',
	'tags.empty': 'Тегов пока нет.',
	'tags.single': 'Тег',
	'tags.taggedWith': 'Записи с этим тегом.',
	'tags.taggedWithDescription': 'Записи с тегом {tag}',
	'tags.noPosts': 'С этим тегом пока нет записей.',

	'notFound.title': 'Страница не найдена',
	'notFound.heading': 'Такую страницу найти не удалось.',
	'notFound.description':
		'Возможно, ссылка сломана или страница переехала. Выберите, куда двигаться дальше.',
	'notFound.home': 'На главную',
	'notFound.blog': 'В блог',
};

export const ui: Record<Locale, Record<TranslationKey, string>> = { en, ru };
