import React, { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { DonutChart, Legend } from '@tremor/react';
import { defaultDataFormatter } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useFilters } from '../../../hooks/useFilters';

const DonutDashlet = () => {

    const { leveledSkillsFilter, currentPeriodFilter, categoryFilter, skillFilter, departmentFilter, filtersAreReady } = useFilters()

    const { data: levelsData, loading: loadingLevelsData } = useFetch<{ levels_название: string, count: number }>({ dimensions: ['levels_название'], measures: ['levels_название', 'count(levels_id)'], filters: { ...leveledSkillsFilter, ...currentPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter }, filtersAreReady, queryKey: 'DonutLevelsData' })
    const finalLevelsData = levelsData ? levelsData.map((level) => ({ level: level.levels_название, count: level.count })) : []

    // Refs
    const ref = useRef()

    return (
        <Card className='h-full flex flex-col'>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Уровни навыков</CardTitle>
                    <CardDescription>круговая диаграмма</CardDescription>
                </div>
                <ExportToPNGButton exportRef={ref} />
            </CardHeader>
            <CardContent ref={ref} className='flex flex-col justify-center items-center gap-2 flex-1'>
                <DonutChart
                    data={finalLevelsData}
                    variant='pie'
                    category="count"
                    index="level"
                    colors={['blue', 'lime', 'violet', 'fuchsia', 'teal', 'indigo', 'emerald']}
                    valueFormatter={defaultDataFormatter}
                    className="w-60 h-60 text-3xl"
                    // showLabel={false}
                    showAnimation={true}
                    noDataText='Нет данных'
                    showLabel={false}
                />
                <Legend
                    categories={finalLevelsData.map((el) => el.level)}
                    colors={['blue', 'lime', 'violet', 'fuchsia', 'teal', 'indigo', 'emerald']}
                    className="max-w-xs"
                />

            </CardContent>
        </Card>
    )
}

export default DonutDashlet