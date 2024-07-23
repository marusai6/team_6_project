import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { BarChart } from '@tremor/react';
import { defaultDataFormatter, getCurrentPeriod } from '../../lib/utils';
import ExportToPNGButton from '../exportButtons/ExportToPNGButton';
import useFetch from '../../hooks/useFetch';
import { UrlState, urlState } from 'bi-internal/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const shortCategoryVariants = new Map([
    ['Инструменты ', 'Инструм.'],
    ['Технологии ', 'Технологии'],
    ['Язык программирования ', 'Язык прогр.'],
    ['Фреймворки ', 'Фреймворки'],
    ['Типы систем ', 'Типы систем'],
    ['Среда разработки ', 'Среда разр.'],
    ['Платформы ', 'Платформы'],
    ['Базы данных ', 'Базы дан.'],
])

const BarChartDashlet = () => {

    const ref = useRef()

    const { year, halfyear, department } = useSelector((state: RootState) => state.filters)
    const periodFilter = { 'period_название': ['=', halfyear === '1' ? `1п - ${year}` : `2п -${year}`] }
    const departmentFilter = department ? { 'подразделения': ['=', department] } : null

    const { data: skillsByCategoryData, loading: loadingSkillsByCategoryData, fetchData: fetchSkillsByCategoryData } = useFetch<{ category_know_название: string, growth: number }>({ dimensions: ['category_know_название'], measures: ['category_know_название', 'sum(growth)'], filters: { lables_n_level: ['!=', null], ...periodFilter, ...departmentFilter } })
    const finalData = skillsByCategoryData.map((skill) => ({ category: shortCategoryVariants.get(skill.category_know_название), Рост: skill.growth })).sort((a, b) => b.Рост - a.Рост)

    useEffect(() => {
        if (year && halfyear) {
            fetchSkillsByCategoryData()
        }
    }, [year, halfyear, department])

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
                    index="category"
                    categories={["Рост"]}
                    colors={['blue']}
                    valueFormatter={defaultDataFormatter}
                    yAxisWidth={48}
                    showLegend={false}
                    className='text-sm'
                    noDataText='Нет данных'
                    showAnimation={true}
                />
            </CardContent>
        </Card>
    )
}

export default BarChartDashlet