import { range } from '@/utils/functions';

export { default } from './FAQ'

interface FAQElement {
	question: string
    answer: string
    isHidden: boolean
}

const maxFaq = 7;

export const elements: FAQElement[] = range(maxFaq).map(value=>{
	return {
		question: `faq:faq-${value}`,
		answer: `faq:faq-${value}-content`,
		isHidden: true
	}
});