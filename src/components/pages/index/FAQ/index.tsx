import { range } from '@/utils/functions';

export { default } from './FAQ'

interface FAQElement {
	question: string
    answer: string
    isHidden: boolean
	withLink: boolean
	link: string
	linkTitle: string
}

const maxFaq = 8;

export const elements: FAQElement[] = range(maxFaq).map(value=>{
	if (value == 5 || value == 7) {
		return {
			question: `faq:faq-${value}`,
			answer: `faq:faq-${value}-content`,
			isHidden: true,
			withLink: true,
			link: `faq:faq-${value}-link`,
			linkTitle: `faq:faq-${value}-link-title`,
		}
	}
	return {
		question: `faq:faq-${value}`,
		answer: `faq:faq-${value}-content`,
		isHidden: true,
		withLink: false,
		link: "",
		linkTitle: "",
	}
});