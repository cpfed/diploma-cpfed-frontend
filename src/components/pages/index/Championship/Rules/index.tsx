export interface WithLink {
	beforeLink: string
	afterLink: string 
	link: string
}

export interface Rule {
	description: string|WithLink|null
	withLink: boolean
	subRules: Rule[]|null
    imageUrl: string|null
}

export const elements: Rule[] = [
	{
		description: 'championship-rules:rule-1',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-2',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-3',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-4',
		withLink: false,
		subRules: [
			{
				description: 'championship-rules:rule-4-subrule-1',
				withLink: false,
				subRules: null,
				imageUrl: null,
			},
			{
				description: 'championship-rules:rule-4-subrule-2',
				withLink: false,
				subRules: null,
				imageUrl: null,
			},
			{
				description: 'championship-rules:rule-4-subrule-3',
				withLink: false,
				subRules: null,
				imageUrl: null,
			},
			{
				description: 'championship-rules:rule-4-subrule-4',
				withLink: false,
				subRules: null,
				imageUrl: null,
			},
		],
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-5',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-6',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-7',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-8',
		withLink: false,
		subRules: null,
        imageUrl: 'images/championship_rules_8.png',
	},
	{
		description: 'championship-rules:rule-9',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-10',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-11',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: {
			beforeLink: "championship-rules:rule-12-before-link",
			afterLink: "championship-rules:rule-12-after-link",
			link: "adina@cpfed.kz",
		},
		withLink: true,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-13',
		withLink: false,
		subRules: null,
        imageUrl: null,
	},
	{
		description: 'championship-rules:rule-14',
		withLink: false,
		subRules: null,
        imageUrl: null,
	}
]

export { default } from './Rules'