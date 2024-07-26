import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { DonutChart, Legend } from '@tremor/react';
import { defaultDataFormatter } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const EmployeeDonutDashlet = () => {

    // Filters
    const { category, skill, employee } = useSelector((state: RootState) => state.filters)

    const categoryFilter = category ? { 'category_know_название': ['=', category] } : null
    const skillFilter = skill ? { 'knowledge_название': ['=', skill] } : null

    const employeeFilter = employee ? { 'User ID': ['=', employee], 'current_level': ['=', 'true'] } : null

    const { data: levelsData, loading: loadingLevelsData, fetchData: fetchLevelsData } = useFetch<{ lables_название: string, lables_id: number, 'period_название': string }>({ dimensions: ['lables_название'], measures: ['count(lables_id)', 'period_название'], filters: { lables_n_level: ['!=', null], ...categoryFilter, ...skillFilter, ...employeeFilter } })
    const finalLevelsData = levelsData.filter((el) => el.period_название.length === 4).map((level) => ({ level: level.lables_название, count: level.lables_id }))

    useEffect(() => {
        fetchLevelsData()
    }, [category, skill, employee])

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

export default EmployeeDonutDashlet