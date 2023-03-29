export interface UserOlympiad {
    id: number
    name: string
    achievement: string
    year: number
    isEditing: boolean
}

export interface NewUserOlympiad {
    name: string
    achievement: string
    year: number
}

export interface UpdatedUserOlympiad {
    id: number
    name: string
    achievement: string
    year: number
}

export interface UserOlympiadList {
    count: number
    next: number
    previous: number
    results: UserOlympiad[]
}