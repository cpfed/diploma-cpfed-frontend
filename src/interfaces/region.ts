export interface Region {
    id: number
    name: string
}

export interface RegionList {
    count: number
    next: number
    previous: number
    results: Region[]
}