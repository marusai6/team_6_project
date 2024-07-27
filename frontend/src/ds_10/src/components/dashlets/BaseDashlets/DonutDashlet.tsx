import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { DonutChart, Legend } from '@tremor/react';
import { defaultDataFormatter } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const DonutDashlet = () => {

    // Filters
    const { year, halfyear, category, skill, department } = useSelector((state: RootState) => state.filters)

    const currentPeriodWithHalfYear = `${halfyear}п - ${year}`
    const currentPeriod = halfyear === 'both' ? year : currentPeriodWithHalfYear
    const currentPeriodFilter = { 'period_название': ['=', currentPeriod] }

    const categoryFilter = category ? { 'category_know_название': ['=', category] } : null
    const skillFilter = skill ? { 'knows_название': ['=', skill] } : null
    const departmentFilter = department ? { 'подразделения': ['=', department] } : null

    const { data: levelsData, loading: loadingLevelsData, fetchData: fetchLevelsData } = useFetch<{ levels_название: string, count: number }>({ dimensions: ['levels_название'], measures: ['levels_название', 'count(levels_id)'], filters: { levels_n_level: ['!=', null], ...currentPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter } })
    const finalLevelsData = levelsData.map((level) => ({ level: level.levels_название, count: level.count }))

    useEffect(() => {
        if (year && halfyear) {
            fetchLevelsData()
        }
    }, [year, halfyear, category, skill, department])

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