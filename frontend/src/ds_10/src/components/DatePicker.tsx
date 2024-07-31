import { urlState, UrlState } from 'bi-internal/core';
import React, { useEffect } from 'react';
import { cn, getCurrentPeriod } from '../lib/utils';

const DatePicker = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const urlModel = UrlState.getModel();
    const urlHalfyear = urlModel.halfyear;
    const urlYear = urlModel.year;

    useEffect(() => {

        const currentPeriod = getCurrentPeriod()
        if (!urlHalfyear) {
            urlState.updateModel({ halfyear: currentPeriod.halfyear });
        }
        if (!urlYear) {
            urlState.updateModel({ year: currentPeriod.year });
        }
    }, []);

    const getYearOptions = (startYear: number) => {
        const result = []
        for (let i = startYear; i <= new Date().getFullYear(); i++) {
            result.push(String(i))
        }
        return result
    }

    const yearOptions = getYearOptions(2021)

    const halfyearOptions = [
        {
            title: 'Весь год',
            value: 'both'
        },
        {
            title: 'Первое',
            value: '1'
        },
        {
            title: 'Второе',
            value: '2'
        },
    ]

    return (
        <div className="flex w-80 flex-col divide-y">
            <div className="flex select-none items-center justify-center bg-primary px-4 py-2 text-white w-full">
                <p className='text-lg'>{urlHalfyear === 'both' ? urlYear : `${urlHalfyear} полугодие ${urlYear}`}</p>
            </div>
            <div className='px-4 py-2 pb-4 space-y-4'>
                <div className='space-y-2'>
                    <h3 className='font-medium'>Год</h3>
                    <div className='flex flex-wrap select-none items-center justify-start gap-2 text-center'>
                        {yearOptions.map((year) => {
                            return (
                                <div
                                    onClick={() => { urlState.updateModel({ year }); setOpen(false) }}
                                    className={cn(
                                        'flex cursor-pointer items-center justify-center rounded-full px-3 py-1 transition-all bg-accent text-accent-foreground hover:bg-secondary',
                                        year == urlYear && 'bg-primary text-white hover:bg-primary'
                                    )}
                                >
                                    {year}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='space-y-2'>
                    <h3 className='font-medium'>Полугодие</h3>
                    <div className='flex select-none items-center justify-start gap-2 text-center'>
                        {halfyearOptions.map((option) => {
                            return (
                                <div
                                    onClick={() => { urlState.updateModel({ halfyear: option.value }); setOpen(false) }}
                                    className={cn(
                                        'flex cursor-pointer items-center justify-center rounded-full px-3 py-1 transition-all bg-accent text-accent-foreground hover:bg-secondary',
                                        urlHalfyear == option.value && 'bg-primary text-white hover:bg-primary'
                                    )}
                                >
                                    {option.title}
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default DatePicker;
