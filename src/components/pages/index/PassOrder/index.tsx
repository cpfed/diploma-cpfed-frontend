export { default } from './PassOrder'

interface PassOrderElement {
	description: string
}

export const elements: PassOrderElement[] = [
	{
		description: 'Пройдите регистрацию до 20-го апреля',
	},
	{
		description: 'Проведение пробного тура',
	},
	{
		description: '1-ый отборочный',
	},
	{
		description: '2-ый отборочный',
	},
	{
		description: 'Финал',
	},
]