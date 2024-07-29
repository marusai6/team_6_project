import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { BarChart } from '@tremor/react';
import { defaultDataFormatter, groupByAndSum } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useFilters } from '../../../hooks/useFilters';

const EmployeeSkillBarChartDashlet = () => {

    const ref = useRef()

    const { leveledSkillsFilter, categoryFilter, employeeFilter, currentLevelFilter } = useFilters()

    // Knowledge Fetching
    const { data: currentSkillsData, loading: loadingCurrentSkillsData } = useFetch<{ knows_название: string, levels_n_level: number, period_название: string }>({ dimensions: ['knows_название'], measures: ['levels_n_level', 'period_название'], filters: { ...leveledSkillsFilter, ...employeeFilter, ...categoryFilter, ...currentLevelFilter }, queryKey: 'EmployeeBarChartSkill' })

    const [finalData, setFinalData] = useState([])

    useEffect(() => {
        if (!loadingCurrentSkillsData) {
            const finalCurrentSkillsData = groupByAndSum(currentSkillsData.filter((el) => el.period_название.length == 4).map((skill) => ({ name: skill.knows_название, Уровень: skill.levels_n_level }))).sort((a, b) => b.Уровень - a.Уровень)
            setFinalData(finalCurrentSkillsData)
        }
    }, [currentSkillsData])

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
                    data={finalData}
                    index="name"
                    categories={["Уровень"]}
                    colors={['blue']}
                    valueFormatter={defaultDataFormatter}
                    yAxisWidth={48}
                    className='text-sm'
                    noDataText='Нет данных'
                    showAnimation={true}
                />
            </CardContent>
        </Card>
    )
}

export default EmployeeSkillBarChartDashlet