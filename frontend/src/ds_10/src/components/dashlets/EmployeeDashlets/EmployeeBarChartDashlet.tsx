import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { BarChart } from '@tremor/react';
import { defaultDataFormatter } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

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

const EmployeeBarChartDashlet = () => {

    const ref = useRef()

    const { category, employee } = useSelector((state: RootState) => state.filters)

    //Filters
    const categoryFilter = { 'category_know_название': ['=', category] }
    const employeeFilter = employee ? { 'User ID': ['=', employee], 'current_level': ['=', 'true'] } : null

    // Category Fetching
    const { data: currentCategoryData, loading: loadingCurrentCategoryData, fetchData: fetchCurrentCategoryData } = useFetch<{ category_know_название: string, lables_n_level: number, period_название: string }>({ dimensions: ['category_know_название'], measures: ['sum(lables_n_level)', 'period_название'], filters: { lables_n_level: ['!=', null], ...employeeFilter } })

    // Knowledge Fetching
    const { data: currentSkillsData, loading: loadingCurrentSkillsData, fetchData: fetchCurrentSkillsData } = useFetch<{ knowledge_название: string, lables_n_level: number, period_название: string }>({ dimensions: ['knowledge_название'], measures: ['lables_n_level', 'period_название'], filters: { lables_n_level: ['!=', null], ...employeeFilter, ...categoryFilter } })

    const [finalData, setFinalData] = useState([])

    useEffect(() => {
        if (!loadingCurrentCategoryData) {
            const finalCurrentData = currentCategoryData.filter((el) => el.period_название.length == 4).map((skill) => ({ name: shortCategoryVariants.get(skill.category_know_название), Уровень: skill.lables_n_level })).sort((a, b) => b.Уровень - a.Уровень)
            setFinalData(finalCurrentData)
        }
    }, [loadingCurrentCategoryData])

    useEffect(() => {
        if (!loadingCurrentSkillsData) {
            const finalCurrentSkillsData = currentSkillsData.filter((el) => el.period_название.length == 4).map((skill) => ({ name: skill.knowledge_название, Уровень: skill.lables_n_level })).sort((a, b) => b.Уровень - a.Уровень)
            setFinalData(finalCurrentSkillsData)
        }
    }, [loadingCurrentSkillsData])

    useEffect(() => {
        if (category) {
            fetchCurrentSkillsData()
        }
        else {
            fetchCurrentCategoryData()
        }
    }, [employee, category])

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

export default EmployeeBarChartDashlet