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

type Order = {
    order_date: string;
    order_totalprice: number;
};

export type GroupedOrder = {
    month: string;
    "Суммарная стоимость заказов": number;
};

export function groupOrdersByMonth(orders: Order[]): GroupedOrder[] {
    const monthNames = ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЙ", "ИЮН", "ИЮЛ", "АВГ", "СЕП", "ОКТ", "НОЯ", "ДЕК"];

    const groupedOrders: { [key: string]: number } = monthNames.reduce((acc, month) => {
        acc[month] = 0
        return acc
    }, {} as { [key: string]: number });

    orders.forEach(order => {
        const monthIndex = new Date(order.order_date).getMonth();
        const monthName = monthNames[monthIndex];
        groupedOrders[monthName] += order.order_totalprice;

    });

    return Object.entries(groupedOrders).map(([month, order_totalprice]) => ({
        month,
        "Суммарная стоимость заказов": Math.trunc(order_totalprice)
    }));

}

export const getFilterYearOptions = () => {
    const startYear = 2004;
    const currentYear = new Date().getFullYear();
    const yearOptions: string[] = [];

    for (let year = startYear; year <= currentYear; year++) {
        yearOptions.push(String(year))
    }
    return yearOptions
}