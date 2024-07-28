import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { BarChart } from '@tremor/react';
import { defaultDataFormatter } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
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

function groupByAndSum(inputArray) {
    const result = {};

    inputArray.forEach(item => {
        if (result[item.name]) {
            result[item.name] += item.Уровень;
        } else {
            result[item.name] = item.Уровень;
        }
    });

    return Object.keys(result).map(name => ({
        name: name,
        Уровень: result[name]
    }));
}

const EmployeeBarChartDashlet = () => {

    const ref = useRef()

    const { category, employee } = useSelector((state: RootState) => state.filters)
    const { leveledSkillsFilter, categoryFilter, employeeFilter, currentLevelFilter } = useFilters()

    // Category Fetching
    const { data: currentCategoryData, loading: loadingCurrentCategoryData } = useFetch<{ category_know_название: string, sum: number, period_название: string }>({ dimensions: ['category_know_название'], measures: ['sum(levels_n_level)', 'period_название'], filters: { ...leveledSkillsFilter, ...employeeFilter, ...currentLevelFilter }, queryKey: 'Employee' })

    // Knowledge Fetching
    const { data: currentSkillsData, loading: loadingCurrentSkillsData } = useFetch<{ knows_название: string, levels_n_level: number, period_название: string }>({ dimensions: ['knows_название'], measures: ['levels_n_level', 'period_название'], filters: { ...leveledSkillsFilter, ...employeeFilter, ...categoryFilter, ...currentLevelFilter } })

    const [finalData, setFinalData] = useState([])

    useEffect(() => {
        if (!loadingCurrentCategoryData) {
            const finalCurrentData = groupByAndSum(currentCategoryData.filter((el) => el.period_название.length == 4).map((skill) => ({ name: shortCategoryVariants.get(skill.category_know_название), Уровень: skill.sum }))).sort((a, b) => b.Уровень - a.Уровень)
            setFinalData(finalCurrentData)
        }
    }, [loadingCurrentCategoryData])

    useEffect(() => {
        if (!loadingCurrentSkillsData) {
            const finalCurrentSkillsData = groupByAndSum(currentSkillsData.filter((el) => el.period_название.length == 4).map((skill) => ({ name: skill.knows_название, Уровень: skill.levels_n_level }))).sort((a, b) => b.Уровень - a.Уровень)
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