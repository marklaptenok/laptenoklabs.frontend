import type { Locale } from './config';

const en = {
	'site.description': 'Laptenok Labs — software engineering, consultancy, education and mentorship.',
	'site.skipToContent': 'Skip to content',

	'nav.home': 'Home',
	'nav.articles': 'Articles',
	'nav.team': 'Team',
	'nav.projects': 'Projects',
	'nav.rss': 'RSS',
	'nav.primary': 'Main navigation',

	'header.debug': 'Toggle layout borders',
	'header.language': 'Change language',

	'search.title': 'Search',
	'search.open': 'Open search dialog',
	'search.heading': 'Find anything on the site',
	'search.close': 'Close search dialog',
	'search.footnote': 'Powered by Pagefind. Start typing to search articles and pages.',
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
	'footer.company': 'Laptenok Labs s.r.o.',
	'footer.ico': 'IČO 21777641',
	'footer.address': 'Prosincová č.ev. 1583/12, Litice, 321 00 Plzeň, Czech Republic',
	'footer.registry': 'Registered at the Regional Court in Plzeň, file C 45452',
	'footer.colophon': 'Built with Astro on the Launchpad template by Rodrigo Cortez and Mark Laptenok.',

	'contact.email': 'customercare@laptenoklabs.com',
	'contact.phone': '(420) 732 662 170',
	'contact.hours': '10:00 – 18:00 UTC',

	'home.hero.eyebrow': 'Software Engineering · Consultancy · Education · Mentorship',
	'home.hero.title': 'Communication among computer systems — and among the people who build them.',
	'home.hero.lead1.term': 'Software solutions',
	'home.hero.lead1.rest': ' which last.',
	'home.hero.lead2.term': 'Consultancy',
	'home.hero.lead2.rest': ' which acts.',
	'home.hero.lead3.term': 'Education',
	'home.hero.lead3.rest': ' which complements the best ones in the domain.',
	'home.hero.lead4.term': 'Mentorship',
	'home.hero.lead4.rest': ' which allows you to do more, more easily.',
	'home.hero.actionLearning': 'Learning platform',
	'home.hero.actionProjects': 'Other projects',

	'home.numbers.eyebrow': 'Education · Mentorship',
	'home.numbers.title':
		'We teach software engineering to people and help engineers achieve their personal goals',
	'home.numbers.copy': 'Figures as of 1 September 2026.',
	'home.numbers.hours.value': '4,525',
	'home.numbers.hours.label': 'Hours of classes',
	'home.numbers.hours.description':
		'Computer networks, operating systems, databases, algorithms, parallel computing.',
	'home.numbers.people.value': '172',
	'home.numbers.people.label': 'People tutored',
	'home.numbers.people.description':
		'Including interns and students of Imperial College London, the universities of Bremen and Auckland, and Moscow State University.',
	'home.numbers.since.value': '2009',
	'home.numbers.since.label': 'Teaching since',
	'home.numbers.since.description': 'Alongside engineering work.',

	'team.title': 'Team',
	'team.eyebrow': 'Laptenok Labs',
	'team.heading': 'The people behind the work',
	'team.description': 'The people of Laptenok Labs.',
	'team.disclaimer':
		'Employers are named here as a matter of record. This site is my own: it is not affiliated with, sponsored by, or endorsed by any of them.',

	'services.eyebrow': 'Engineering · Consultancy',
	'services.title': 'We help to achieve your goals using software',
	'services.copy':
		'We bring critical thinking, experience in bigtech and fintech, and interpersonal skills honed over fifteen years. We care that our clients reach their goals, and we face challenge, change, and chaos with open eyes.',
	'services.one.title': 'Audit of your IT system',
	'services.one.body':
		'Risk analysis, documenting, refactoring, rewriting, fixing, adding functionality, finding maintainers, training.',
	'services.two.title': 'Creation of algorithms and mathematical models to optimize your processes',
	'services.two.body': '',
	'services.three.title': 'Audit of engineering teams',
	'services.three.body': 'Helping to hire and build a long-term fruitful environment.',

	'cv.label': 'CV',
	'cv.updated': 'Updated {date}',

	'articles.title': 'Articles',
	'articles.description': 'Notes on software engineering.',
	'articles.empty': 'No articles published yet.',
	'articles.postEyebrow': 'Article',
	'articles.updated': 'Updated',

	'projects.title': 'Projects',
	'projects.eyebrow': 'Projects',
	'projects.heading': 'Things we build',
	'projects.description': 'Work and side projects we can write about.',
	'projects.metaDescription': 'Projects by Mark Laptenok.',
	'projects.empty': 'No projects published yet.',
	'projects.postEyebrow': 'Project',
	'projects.inProgress': 'In progress... 0%',

	'notFound.title': 'Page not found',
	'notFound.message': 'This page does not exist. Feel free to contact us on {email} if it should.',
} as const;

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
	'site.description': 'Laptenok Labs — разработка ПО, консалтинг, обучение и наставничество.',
	'site.skipToContent': 'Перейти к содержимому',

	'nav.home': 'Главная',
	'nav.articles': 'Статьи',
	'nav.team': 'Команда',
	'nav.projects': 'Проекты',
	'nav.rss': 'RSS',
	'nav.primary': 'Основная навигация',

	'header.debug': 'Показать границы вёрстки',
	'header.language': 'Сменить язык',

	'search.title': 'Поиск',
	'search.open': 'Открыть поиск',
	'search.heading': 'Найти что угодно на сайте',
	'search.close': 'Закрыть поиск',
	'search.footnote': 'Работает на Pagefind. Начните вводить запрос, чтобы искать по статьям и страницам.',
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
	'footer.company': 'Laptenok Labs s.r.o.',
	'footer.ico': 'IČO 21777641',
	'footer.address': 'Prosincová č.ev. 1583/12, Litice, 321 00 Пльзень, Чехия',
	'footer.registry': 'Зарегистрировано в Краевом суде в Пльзене, дело C 45452',
	'footer.colophon': 'Сделано на Astro, шаблон Launchpad, авторы — Rodrigo Cortez и Марк Лаптёнок.',

	'contact.email': 'customercare@laptenoklabs.com',
	'contact.phone': '(420) 732 662 170',
	'contact.hours': '10:00 – 18:00 UTC',

	'home.hero.eyebrow': 'Разработка ПО · Консалтинг · Обучение · Наставничество',
	'home.hero.title': 'Коммуникация между компьютерными системами — и между людьми, которые их создают.',
	'home.hero.lead1.term': 'Программные решения',
	'home.hero.lead1.rest': ', которые служат долго.',
	'home.hero.lead2.term': 'Консалтинг',
	'home.hero.lead2.rest': ', который действует.',
	'home.hero.lead3.term': 'Обучение',
	'home.hero.lead3.rest': ', которое дополняет лучшее в отрасли.',
	'home.hero.lead4.term': 'Наставничество',
	'home.hero.lead4.rest': ', которое делает путь легче.',
	'home.hero.actionLearning': 'Учебная платформа',
	'home.hero.actionProjects': 'Другие проекты',

	'home.numbers.eyebrow': 'Обучение · Наставничество',
	'home.numbers.title':
		'Мы учим программной инженерии и помогаем инженерам достигать личных целей',
	'home.numbers.copy': 'Данные на 1 сентября 2026 года.',
	'home.numbers.hours.value': '4 525',
	'home.numbers.hours.label': 'Часов занятий',
	'home.numbers.hours.description':
		'Компьютерные сети, операционные системы, базы данных, алгоритмы, параллельные вычисления.',
	'home.numbers.people.value': '172',
	'home.numbers.people.label': 'Обучено человек',
	'home.numbers.people.description':
		'В том числе стажёры и студенты Imperial College London, университетов Бремена и Окленда, МГУ.',
	'home.numbers.since.value': '2009',
	'home.numbers.since.label': 'Преподаём с',
	'home.numbers.since.description': 'Параллельно с инженерной работой.',

	'team.title': 'Команда',
	'team.eyebrow': 'Laptenok Labs',
	'team.heading': 'Люди, которые делают работу',
	'team.description': 'Команда Laptenok Labs.',
	'team.disclaimer':
		'Работодатели названы здесь для точности изложения. Сайт мой собственный: он не связан с ними, не спонсируется и не одобряется ими.',

	'services.eyebrow': 'Инженерия · Консалтинг',
	'services.title': 'Мы помогаем достигать ваших целей с помощью программ',
	'services.copy':
		'Мы привносим критическое мышление, опыт в бигтехе и финтехе и навыки общения, которые оттачивались пятнадцать лет. Нам важно, чтобы клиенты достигали своих целей, и мы встречаем вызовы, перемены и хаос с открытыми глазами.',
	'services.one.title': 'Аудит вашей ИТ-системы',
	'services.one.body':
		'Анализ рисков, документирование, рефакторинг, переписывание, исправление ошибок, добавление функциональности, поиск сопровождающих, обучение.',
	'services.two.title': 'Создание алгоритмов и математических моделей для оптимизации ваших процессов',
	'services.two.body': '',
	'services.three.title': 'Аудит инженерных команд',
	'services.three.body': 'Помощь в найме и построении долгосрочной продуктивной среды.',

	'cv.label': 'Резюме',
	'cv.updated': 'Обновлено {date}',

	'articles.title': 'Статьи',
	'articles.description': 'Заметки о программной инженерии.',
	'articles.empty': 'Статей пока нет.',
	'articles.postEyebrow': 'Статья',
	'articles.updated': 'Обновлено',

	'projects.title': 'Проекты',
	'projects.eyebrow': 'Проекты',
	'projects.heading': 'Что мы делаем',
	'projects.description': 'Рабочие и личные проекты, о которых можно рассказать.',
	'projects.metaDescription': 'Проекты Марка Лаптёнка.',
	'projects.empty': 'Проекты пока не опубликованы.',
	'projects.postEyebrow': 'Проект',
	'projects.inProgress': 'В работе... 0%',

	'notFound.title': 'Страница не найдена',
	'notFound.message': 'Такой страницы не существует. Если она должна быть, напишите нам на {email}.',
};

export const ui: Record<Locale, Record<TranslationKey, string>> = { en, ru };
