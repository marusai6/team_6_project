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
                    <CardTitle>Соотношение грейдов</CardTitle>
                    <CardDescription>для выбранных фильтров</CardDescription>
                </div>
                <ExportToPNGButton exportRef={ref} />
            </CardHeader>
            <CardContent ref={ref} className='flex flex-col justify-center items-center gap-2 flex-1 px-20'>
                <div className='h-56 3xl:h-96 w-full'>
                    <DonutChart
                        data={finalLevelsData}
                        variant='pie'
                        category="count"
                        index="level"
                        colors={['blue', 'lime', 'violet', 'fuchsia', 'teal', 'indigo', 'emerald']}
                        valueFormatter={defaultDataFormatter}
                        className="h-full"
                        showAnimation={true}
                        noDataText='Нет данных'
                        showLabel={false}
                    />
                </div>
                <Legend
                    categories={finalLevelsData.map((el) => el.level)}
                    colors={['blue', 'lime', 'violet', 'fuchsia', 'teal', 'indigo', 'emerald']}
                    className="max-w-xs"
                />

            </CardContent>
        </Card >
    )
}

export default DonutDashlet