import React, { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { DonutChart, Legend } from '@tremor/react';
import { defaultDataFormatter } from '../../lib/utils';
import ExportToPNGButton from '../ExportToPNGButton';


const sales = [
    {
        name: 'Использовал в проекте',
        sales: 980,
    },
    {
        name: 'Novice',
        sales: 456,
    },
    {
        name: 'Junior',
        sales: 390,
    },
    {
        name: 'Middle',
        sales: 240,
    },
    {
        name: 'Senior',
        sales: 190,
    },
    {
        name: 'Expert',
        sales: 121,
    },
]

const DonutDashlet = () => {

    const ref = useRef()

    return (
        <Card className='h-full'>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Уровни навыков</CardTitle>
                    <CardDescription>круговая диаграмма</CardDescription>
                </div>
                <ExportToPNGButton exportRef={ref} />
            </CardHeader>
            <CardContent ref={ref} className='flex flex-col justify-center items-center gap-2'>
                <DonutChart
                    data={sales}
                    category="sales"
                    index="name"
                    valueFormatter={defaultDataFormatter}
                    className="w-60 h-60 text-3xl"
                />
                <Legend
                    categories={sales.map((el) => el.name)}
                    className="max-w-xs"
                />

            </CardContent>
        </Card>
    )
}

export default DonutDashlet