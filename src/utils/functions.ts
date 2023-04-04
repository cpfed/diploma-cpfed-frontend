import { EnumType } from "typescript";

/**
 * 
 * @param to 
 * @returns array. Example: range(5) -> [1,2,3,4,5]
 */
export const range = (to: number) => {
    return Array.from({length: to}, (value, index) => index + 1)
}

export const parseBackendError = (err: any): string[] => {
    return err.response?.data?.message?.split("\n") ?? [];
}

export const getEnumValueIndex = (enumType: EnumType, enumValue: any): number => {
    return Object.values(enumType).indexOf(enumValue);
}