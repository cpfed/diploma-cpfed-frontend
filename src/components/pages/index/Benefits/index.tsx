import icons from '@/utils/icons'

interface BenefitElement {
	title: string
	content: string
    image: string
}

export const elements: BenefitElement[] = [
	{
		title: 'benefits:benefit-1',
		content: 'benefits:benefit-1-content',
        image: icons.benefit1.src
	},
	{
		title: 'benefits:benefit-2',
		content: 'benefits:benefit-2-content',
        image: icons.benefit2.src
	},
	{
		title: 'benefits:benefit-3',
		content: 'benefits:benefit-3-content',
        image: icons.benefit3.src
	},
	{
		title: 'benefits:benefit-4',
		content: 'benefits:benefit-4-content',
        image: icons.benefit4.src
	},
]

export { default } from './Benefits'