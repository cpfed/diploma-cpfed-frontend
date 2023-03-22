interface LinkElement {
	title: string
	link?: string
}

export const elements: LinkElement[] = [
	{
		title: 'Главная',
		link: '/',
	},
	{
		title: 'Правила Чемпионата',
		link: '/championship',
	},
	{
		title: 'Полезные документы',
		link: '/documents',
	},
	{
		title: 'Спонсоры и партнеры',
		link: '/sponsors'
	},
]

export { default } from './Header'