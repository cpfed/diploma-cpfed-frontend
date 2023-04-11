import { range } from '@/utils/functions';

export { default } from './FAQ'

interface FAQElement {
	question: string
    answer: string
    isHidden: boolean
	withLink: boolean
	link: string
}

const maxFaq = 7;

export const elements: FAQElement[] = range(maxFaq).map(value=>{
	if (value == maxFaq) {
		return {
			question: `faq:faq-${value}`,
			answer: `faq:faq-${value}-content`,
			isHidden: true,
			withLink: true,
			link: "https://t.me/cpfed"
		}
	} 
	return {
		question: `faq:faq-${value}`,
		answer: `faq:faq-${value}-content`,
		isHidden: true,
		withLink: false,
		link: ""
	}
});