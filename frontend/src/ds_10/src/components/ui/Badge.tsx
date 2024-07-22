import { TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'

const Badge = ({ number }: { number: number }) => {

    if (number > 0) {
        return (
            <div className='flex gap-1 h-fit items-center bg-emerald-100 rounded-full px-2 py-0.5 text-emerald-700'>
                <TrendingUp size={18} strokeWidth={1.5} />
                <p>{`+${number}%`}</p>
            </div>
        )
    }

    return (
        <div className='flex gap-1 h-fit items-center bg-rose-100 rounded-full px-2 py-0.5 text-rose-700'>
            <TrendingDown size={18} strokeWidth={1.5} />
            <p className='m-auto'>{`${number}%`}</p>
        </div>
    )
}

export default Badge