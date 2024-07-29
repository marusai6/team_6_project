import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
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

export function groupByAndSum(inputArray) {
    const result = {};

    inputArray.forEach(item => {
        if (result[item.name]) {
            result[item.name] += item.Уровень;
        } else {
            result[item.name] = item.Уровень;
        }
    });

    return Object.keys(result).map(name => ({
        name: name,
        Уровень: result[name]
    }));
}