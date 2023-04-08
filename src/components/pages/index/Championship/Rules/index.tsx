export interface WithLink {
	beforeLink: string
	afterLink: string 
	link: string
}

export interface Table {
	columns: string[]
}

export interface Rule {
	description: string|WithLink|null
	withLink: boolean
	subRules: Rule[]|null
    table: Table[]|null
}

export const elements: Rule[] = [
	{
		description: 'championship-rules:rule-1',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-2',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-3',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-4',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-5',
		withLink: false,
		subRules: null,
        table: [
			{
				columns: [
					"championship-rules:rule-5-table.row-1.col-1", 
					"championship-rules:rule-5-table.row-1.col-2",
				],
			},
			{
				columns: [
					"championship-rules:rule-5-table.row-2.col-1", 
					"championship-rules:rule-5-table.row-2.col-2",
				],
			},
			{
				columns: [
					"championship-rules:rule-5-table.row-3.col-1", 
					"championship-rules:rule-5-table.row-3.col-2",
				],
			},
			{
				columns: [
					"championship-rules:rule-5-table.row-4.col-1", 
					"championship-rules:rule-5-table.row-4.col-2",
				],
			},
			{
				columns: [
					"championship-rules:rule-5-table.row-5.col-1", 
					"championship-rules:rule-5-table.row-5.col-2",
				],
			},
			{
				columns: [
					"championship-rules:rule-5-table.row-6.col-1", 
					"championship-rules:rule-5-table.row-6.col-2",
				],
			},
			{
				columns: [
					"championship-rules:rule-5-table.row-7.col-1", 
					"championship-rules:rule-5-table.row-7.col-2",
				],
			},
		],
	},
	{
		description: 'championship-rules:rule-6',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-7',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: {
			beforeLink: "championship-rules:rule-9-before-link",
			afterLink: "championship-rules:rule-9-after-link",
			link: "adina@cpfed.kz",
		},
		withLink: true,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-10',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-11',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-12',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-13',
		withLink: false,
		subRules: null,
        table: null,
	},
	{
		description: 'championship-rules:rule-14',
		withLink: false,
		subRules: [
			{
				description: 'championship-rules:rule-14-subrule-1',
				withLink: false,
				subRules: null,
				table: null,
			},
			{
				description: 'championship-rules:rule-14-subrule-2',
				withLink: false,
				subRules: null,
				table: null,
			},
			{
				description: 'championship-rules:rule-14-subrule-3',
				withLink: false,
				subRules: null,
				table: null,
			},
			{
				description: 'championship-rules:rule-14-subrule-4',
				withLink: false,
				subRules: null,
				table: null,
			},
		],
        table: null,
	},
	{
		description: 'championship-rules:rule-15',
		withLink: false,
		subRules: null,
        table: null,
	},
]

export { default } from './Rules'