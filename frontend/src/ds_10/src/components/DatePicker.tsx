import { urlState, UrlState } from 'bi-internal/core'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { cn } from '../lib/utils'

const DatePicker = () => {

    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

    const urlModel = UrlState.getModel()
    const urlMonth = urlModel.month
    const urlYear = urlModel.year

    useEffect(() => {
        if (!urlMonth) {
            urlState.updateModel({ month: months[new Date().getMonth()] })
        }
        if (!urlYear) {
            urlState.updateModel({ year: new Date().getFullYear().toString() })
        }
    }, [])

    return (
        <div className='flex flex-col divide-y w-60'>
            <div className='flex justify-between items-center bg-primary text-white px-4 py-2 select-none'>
                <ChevronLeft
                    onClick={() => {
                        urlState.updateModel({ year: +urlYear - 1 })
                    }}
                    size={30}
                    className='cursor-pointer p-1 hover:bg-secondary hover:text-primary transition-all rounded-full'
                />
                <p>{urlYear}</p>
                <ChevronRight
                    onClick={() => {
                        urlState.updateModel({ year: +urlYear + 1 })
                    }}
                    size={30}
                    className='cursor-pointer p-1 hover:bg-secondary hover:text-primary transition-all rounded-full'
                />
            </div>
            <div className='grid grid-cols-4 p-2 gap-1 items-center justify-center select-none'>
                {months.map((month) => {
                    return (
                        <div key={`month-${month}`} className='flex items-center justify-center'>
                            <div onClick={() => {
                                urlState.updateModel({ month })
                            }}
                                className={cn('flex items-center justify-center size-10 hover:bg-secondary rounded-full p-1 cursor-pointer transition-all', month == urlMonth && 'bg-primary text-white hover:bg-primary')}
                            >
                                {month}
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default DatePicker