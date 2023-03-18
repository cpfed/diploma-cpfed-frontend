interface LinkElement {
	title: string
	link?: string
}

export const elements: LinkElement[] = [
	{
		title: 'О чемпионате',
		link: '#about',
	},
	{
		title: 'Порядок прохождения',
		link: '#passOrder',
	},
	{
		title: 'Вопросы-Ответы',
		link: '#faq',
	},
	{
		title: 'Полезные документы',
		link: '#usefulDocuments',
	},
	{
		title: 'Спонсоры и партнеры',
		link: '#sponsors',
	},
]

export { default } from './Intro'