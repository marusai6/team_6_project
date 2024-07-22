import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const currencyDataFormatter = (number: number) => {
    if (number > 99999) {
        const res = Math.trunc(number / 1000)
        return `${Intl.NumberFormat('ru').format(res).toString()} т.р.`
    }
    return `${Intl.NumberFormat('ru').format(Math.trunc(number)).toString()} р.`
}


export const defaultDataFormatter = (number: number) => {
    return Intl.NumberFormat('ru').format(number).toString()
}

export function getNoun(number: number, one: string, two: string, five: string) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

export function getCurrentPeriod() {
    return {
        halfyear: new Date().getMonth() < 6 ? '1' : '2',
        year: new Date().getFullYear().toString()
    }
}