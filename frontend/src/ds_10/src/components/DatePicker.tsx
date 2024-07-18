import { urlState, UrlState } from 'bi-internal/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { cn } from '../lib/utils';

const DatePicker = () => {
    const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

    const urlModel = UrlState.getModel();
    const urlHalfyear = urlModel.halfyear;
    const urlYear = urlModel.year;

    useEffect(() => {
        if (!urlHalfyear) {
            urlState.updateModel({ halfyear: new Date().getMonth() < 6 ? '1' : '2' });
        }
        if (!urlYear) {
            urlState.updateModel({ year: new Date().getFullYear().toString() });
        }
    }, []);

    return (
        <div className="flex w-60 flex-col divide-y">
            <div className="flex select-none items-center justify-between bg-primary px-4 py-2 text-white">
                <ChevronLeft
                    onClick={() => {
                        urlState.updateModel({ year: +urlYear - 1 });
                    }}
                    size={30}
                    className="cursor-pointer rounded-full p-1 transition-all hover:bg-secondary hover:text-primary"
                />
                <p>{urlYear}</p>
                <ChevronRight
                    onClick={() => {
                        urlState.updateModel({ year: +urlYear + 1 });
                    }}
                    size={30}
                    className="cursor-pointer rounded-full p-1 transition-all hover:bg-secondary hover:text-primary"
                />
            </div>
            <div className="flex select-none items-center justify-center gap-1 p-2 text-center">
                <div
                    onClick={() => {
                        urlState.updateModel({ halfyear: '1' });
                    }}
                    className={cn(
                        'flex cursor-pointer items-center justify-center rounded-full p-1 transition-all hover:bg-secondary',
                        urlHalfyear == '1' && 'bg-primary text-white hover:bg-primary'
                    )}
                >
                    Первое полугодие
                </div>
                <div
                    onClick={() => {
                        urlState.updateModel({ halfyear: '2' });
                    }}
                    className={cn(
                        'flex cursor-pointer items-center justify-center rounded-full p-1 transition-all hover:bg-secondary',
                        urlHalfyear == '2' && 'bg-primary text-white hover:bg-primary'
                    )}
                >
                    Второе полугодие
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
