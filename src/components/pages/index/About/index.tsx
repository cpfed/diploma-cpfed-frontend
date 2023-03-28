import { range } from '@/utils/functions';

interface Place {
    place: string
	fund: string
}

// calc from about.json
const maxPlacesIn1 = 7;
const maxPlacesIn2 = 2;

export const places1: Place[] = range(maxPlacesIn1).map((value)=>{
    return {
        place: `${value}-place`,
        fund: `fund-${value}-place`
    }
})

export const places2: Place[] = range(maxPlacesIn2).map((value)=>{
    return {
        place: `${value}-place-2`,
        fund: `fund-${value}-place-2`
    }
})


export { default } from './About'