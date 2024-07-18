import React, { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { BarChart } from '@tremor/react';
import { defaultDataFormatter } from '../../lib/utils';
import ExportToPNGButton from '../ExportToPNGButton';


const chartdata = [
    {
        name: 'Платформы',
        Рост: 2488,
    },
    {
        name: 'Инструменты',
        Рост: 1445,
    },
    {
        name: 'Базы данных',
        Рост: 743,
    },
    {
        name: 'Среда разраб.',
        Рост: 281,
    },
    {
        name: 'Фреймворки',
        Рост: 251,
    },
    {
        name: 'Языки прогр.',
        Рост: 232,
    },
    {
        name: 'Типы систем',
        Рост: 98,
    },
];

const BarChartDashlet = () => {

    const ref = useRef()

    return (
        <Card className='h-full'>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Категории навыков</CardTitle>
                    <CardDescription>столбчатая диаграмма</CardDescription>
                </div>
                <ExportToPNGButton exportRef={ref} />
            </CardHeader>
            <CardContent ref={ref}>
                <BarChart
                    data={chartdata}
                    index="name"
                    categories={["Рост"]}
                    colors={['blue']}
                    valueFormatter={defaultDataFormatter}
                    yAxisWidth={48}
                    showLegend={false}
                    className='text-sm'
                />
            </CardContent>
        </Card>
    )
}

export default BarChartDashlet