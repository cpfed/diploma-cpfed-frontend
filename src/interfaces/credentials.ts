import { Tokens } from "./tokens"

export interface CpfedCredentials {
    id: number
    uin: string
    phone_number: string
    email: string
    tokens: Tokens
}