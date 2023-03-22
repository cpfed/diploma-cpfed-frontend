interface Place {
    place: string
	fund: string
}

export const elements: Place[] = [
	{
        place: "about:first-place",
        fund: "about:fund-first-place",
	},
    {
        place: "about:second-place",
        fund: "about:fund-second-place",
	},
    {
        place: "about:third-place",
        fund: "about:fund-third-place",
	}
]

export { default } from './About'