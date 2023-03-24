export interface NewUserToPlatform {
    platform_id: number
    handle: string
}

export interface UpdatedUserToPlatform {
    id: number
    handle: string
}

export interface UserToPlatform {
    id: number
    platform: {
        id: number
        name: string
    }
    handle: string
    isEditing: boolean
}

export interface UserToPlatformList {
    count: number
    next: number
    previous: number
    results: UserToPlatform[] 
}