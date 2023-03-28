/**
 * 
 * @param to 
 * @returns array. Example: range(5) -> [1,2,3,4,5]
 */
export const range = (to: number) => {
    return Array.from({length: to}, (value, index) => index + 1)
}