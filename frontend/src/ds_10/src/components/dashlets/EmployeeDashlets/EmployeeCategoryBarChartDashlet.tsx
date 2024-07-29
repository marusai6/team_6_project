import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { BarChart } from '@tremor/react';
import { defaultDataFormatter, groupByAndSum } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useFilters } from '../../../hooks/useFilters';

const shortCategoryVariants = new Map([
    ['Инструменты ', 'Инструм.'],
    ['Технологии ', 'Технологии'],
    ['Язык программирования ', 'Язык прогр.'],
    ['Фреймворки ', 'Фреймворки'],
    ['Типы систем ', 'Типы систем'],
    ['Среда разработки ', 'Среда раз.'],
    ['Платформы ', 'Платформы'],
    ['Базы данных ', 'Базы дан.'],
])

const EmployeeCategoryBarChartDashlet = () => {

    const ref = useRef()

    const { leveledSkillsFilter, employeeFilter, currentLevelFilter } = useFilters()

    // Category Fetching
    const { data: currentCategoryData, loading: loadingCurrentCategoryData } = useFetch<{ category_know_название: string, sum: number, period_название: string }>({ dimensions: ['category_know_название'], measures: ['sum(levels_n_level)', 'period_название'], filters: { ...leveledSkillsFilter, ...employeeFilter, ...currentLevelFilter }, queryKey: 'EmployeeBarChartCategory' })

    const [finalData, setFinalData] = useState([])

    useEffect(() => {
        if (!loadingCurrentCategoryData) {
            const finalCurrentData = groupByAndSum(currentCategoryData.filter((el) => el.period_название.length == 4).map((skill) => ({ name: shortCategoryVariants.get(skill.category_know_название), Уровень: skill.sum }))).sort((a, b) => b.Уровень - a.Уровень)
            setFinalData(finalCurrentData)
        }
    }, [currentCategoryData])


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

export default EmployeeCategoryBarChartDashlet