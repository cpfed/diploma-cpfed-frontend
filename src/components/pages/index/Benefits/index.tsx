export { default } from './Benefits'

interface BenefitElement {
	title: string
    image: string
}

export const elements: BenefitElement[] = [
	{
		title: 'Новые возможности',
        image: 'images/benefit1.png'
	},
	{
		title: 'Знакомство с коммьюнити',
        image: 'images/benefit2.png'
	},
	{
		title: 'Навык командной работы',
        image: 'images/benefit3.png'
	},
	{
		title: 'Личностный рост',
        image: 'images/benefit4.png'
	},
	{
		title: 'Возможность путешествовать',
        image: 'images/benefit5.png'
	},
]