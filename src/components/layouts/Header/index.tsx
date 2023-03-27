import { LinkElement } from '@/interfaces/linkElement'
import icons from '@/utils/icons';

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

interface DropdownElement {
	title: string
	iconSrc: string
	href: string
}

const loggedIn: DropdownElement[] = [
	{
		title: "Мой аккаунт",
		iconSrc: icons.headerProfile.src,
		href: "/profile"
	},
	{
		title: "Выйти с аккаунта",
		iconSrc: icons.headerExit.src,
		href: "/signOut"
	}
] 

const loggedOut: DropdownElement[] = [
	{
		title: "Войти в аккаунт",
		iconSrc: icons.headerEnter.src,
		href: "/login"
	},
	{
		title: "Создать аккаунт",
		iconSrc: icons.headerAdd.src,
		href: "/signUp"
	}
]

export const dropdownElements = {
	loggedIn,
	loggedOut
}

export { default } from './Header'