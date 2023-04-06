import { EmploymentStatus } from "@/enums/employmentStatus"
import { Gender } from "@/enums/gender.enum"
import { TShirtSize } from "@/enums/t-shirt-size.enum"

export const cpfedAccountUpdateFieldsExclude = [
    "first_name",
    "last_name",
    "uin",
    "region_id",
]

export interface CpfedAccount {
    email: string
    first_name: string
    last_name: string
    phone_number: string
    uin: string 
    employment_status: EmploymentStatus
    region_id: number
    t_shirt_size: TShirtSize
    gender: Gender
    citizen_of_kz: boolean
    place_of_study_of_work: string
}

export interface CpfedAccountWithPassword extends CpfedAccount {
    password: string
}

export type CpfedAccountUpdate = Omit<CpfedAccount,  "first_name"|"last_name"|"uin"|"region_id" >