import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { defaultDataFormatter } from '../../lib/utils'
import { Skeleton } from './Skeleton'

const Badge = ({ number, isLoading }: { number: number, isLoading: boolean }) => {

    if (isLoading) {
        return <Skeleton className='rounded-full w-20 h-8' />
    }

    if (!isFinite(number) || isNaN(number)) {
        return (
            <p className='text-accent'>Нет данных</p>
        )
    }

    if (number > 0) {
        return (
            <div className='flex gap-1 h-8 items-center bg-emerald-100 rounded-full px-2 py-0.5 text-emerald-700'>
                <TrendingUp size={18} strokeWidth={1.5} />
                <p className='text-lg'>{`+${defaultDataFormatter(number)}%`}</p>
            </div>
        )
    }

    return (
        <div className='flex gap-1 h-fit items-center bg-rose-100 rounded-full px-2 py-0.5 text-rose-700'>
            <TrendingDown size={18} strokeWidth={1.5} />
            <p className='text-lg'>{`${defaultDataFormatter(number)}%`}</p>
        </div>
    )
}

export default Badge