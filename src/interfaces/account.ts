import { Gender } from "@/enums/gender.enum"
import { TShirtSize } from "@/enums/t-shirt-size.enum"

export interface CpfedAccount {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    last_education_institution: string
    year_of_education: number
    uin: string 
    t_shirt_size: TShirtSize
    gender: Gender
}

export interface CpfedAccountWithPassword extends CpfedAccount {
    password: string
}