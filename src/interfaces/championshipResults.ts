import { Region } from "./region"

export interface CurrentChampionshipResultsRequest {
    limit: number
    page: number
    region_id: number | null,
    fullname: string
}

export interface CurrentChampionshipResults {
    rank: number
    fullname: string
    region: Region
    points: number[]
    total_points: number
}

export interface CurrentChampionshipResultsList {
    count: number
    next: number
    previous: number
    results: CurrentChampionshipResults[]
}