import { Tokens } from "./tokens"

export interface CpfedAccount {
    id: number
    uin: string
    phone_number: string
    email: string
    tokens: Tokens
}