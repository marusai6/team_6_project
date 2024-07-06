import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const currencyDataFormatter = (number: number) =>
    `${Intl.NumberFormat('ru').format(number).toString()} руб`;

export const defaultDataFormatter = (number: number) =>
    Intl.NumberFormat('ru').format(number).toString();