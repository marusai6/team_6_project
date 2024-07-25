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
    ['Среда разработки ', 'Среда раз.'],
    ['Платформы ', 'Платформы'],
    ['Базы данных ', 'Базы дан.'],
])

function mergeArrays(array1: { name: string, Рост: number }[], array2: { name: string, Рост: number }[], firstArrayTitle: string, secondArrayTitle: string) {
    const result = [];

    const array2Dict = array2.reduce((acc, item) => {
        acc[item.name] = item.Рост;
        return acc;
    }, {});

    const categoriesSet = new Set();

    array1.forEach(item => {
        categoriesSet.add(item.name);
        result.push({
            name: item.name,
            [firstArrayTitle]: item.Рост,
            [secondArrayTitle]: array2Dict[item.name] || 0
        });
    });

    array2.forEach(item => {
        if (!categoriesSet.has(item.name)) {
            result.push({
                name: item.name,
                [firstArrayTitle]: 0,
                [secondArrayTitle]: item.Рост
            });
        }
    });

    return result;
}

const BarChartDashlet = () => {

    const ref = useRef()

    const { year, halfyear, department, category } = useSelector((state: RootState) => state.filters)


    const currentPeriodWithHalfYear = halfyear === '1' ? `1п - ${year}` : `2п - ${year}`
    const previousPeriodWithHalfYear = halfyear === '1' ? `2п - ${+year - 1}` : `1п - ${year}`

    const currentPeriod = halfyear === 'both' ? year : currentPeriodWithHalfYear
    const previousPeriod = halfyear === 'both' ? String(+year - 1) : previousPeriodWithHalfYear

    const currentPeriodFilter = { 'period_название': ['=', currentPeriod] }
    const previousPeriodFilter = { 'period_название': ['=', previousPeriod] }
    const departmentFilter = department ? { 'подразделения': ['=', department] } : null

    const categoryFilter = { 'category_know_название': ['=', category] }

    // Category Fetching
    const { data: currentSkillsByCategoryData, loading: loadingCurrentSkillsByCategoryData, fetchData: fetchCurrentSkillsByCategoryData } = useFetch<{ category_know_название: string, growth: number }>({ dimensions: ['category_know_название'], measures: ['category_know_название', 'sum(growth)'], filters: { lables_n_level: ['!=', null], ...currentPeriodFilter, ...departmentFilter } })
    const finalCurrentData = currentSkillsByCategoryData.map((skill) => ({ name: shortCategoryVariants.get(skill.category_know_название), Рост: skill.growth })).sort((a, b) => b.Рост - a.Рост)

    const { data: previousSkillsByCategoryData, loading: loadingPreviousSkillsByCategoryData, fetchData: fetchPreviousSkillsByCategoryData } = useFetch<{ category_know_название: string, growth: number }>({ dimensions: ['category_know_название'], measures: ['category_know_название', 'sum(growth)'], filters: { lables_n_level: ['!=', null], ...previousPeriodFilter, ...departmentFilter } })
    const finalPreviousData = previousSkillsByCategoryData.map((skill) => ({ name: shortCategoryVariants.get(skill.category_know_название), Рост: skill.growth })).sort((a, b) => b.Рост - a.Рост)


    // Knowledge Fetching
    const { data: currentSkillsData, loading: loadingCurrentSkillsData, fetchData: fetchCurrentSkillsData } = useFetch<{ knowledge_название: string, growth: number }>({ dimensions: ['knowledge_название'], measures: ['knowledge_название', 'sum(growth)'], filters: { lables_n_level: ['!=', null], ...currentPeriodFilter, ...departmentFilter, ...categoryFilter } })
    const finalCurrentSkillsData = currentSkillsData.map((skill) => ({ name: skill.knowledge_название, Рост: skill.growth })).sort((a, b) => b.Рост - a.Рост)

    const { data: previousSkillsData, loading: loadingPreviousSkillsData, fetchData: fetchPreviousSkillsData } = useFetch<{ knowledge_название: string, growth: number }>({ dimensions: ['knowledge_название'], measures: ['knowledge_название', 'sum(growth)'], filters: { lables_n_level: ['!=', null], ...previousPeriodFilter, ...departmentFilter, ...categoryFilter } })
    const finalPreviousSkillsData = previousSkillsData.map((skill) => ({ name: skill.knowledge_название, Рост: skill.growth })).sort((a, b) => b.Рост - a.Рост)

    const [finalData, setFinalData] = useState([])

    useEffect(() => {
        if (!loadingCurrentSkillsByCategoryData && !loadingPreviousSkillsByCategoryData) {
            setFinalData(mergeArrays(finalCurrentData, finalPreviousData, currentPeriod, previousPeriod))
        }
    }, [loadingCurrentSkillsByCategoryData, loadingPreviousSkillsByCategoryData])

    useEffect(() => {
        if (!loadingCurrentSkillsData && !loadingPreviousSkillsData) {
            setFinalData(mergeArrays(finalCurrentSkillsData, finalPreviousSkillsData, currentPeriod, previousPeriod))
        }
    }, [loadingCurrentSkillsData, loadingPreviousSkillsData])

    useEffect(() => {
        if (year && halfyear) {
            if (category) {
                fetchCurrentSkillsData()
                fetchPreviousSkillsData()
            }
            else {
                fetchCurrentSkillsByCategoryData()
                fetchPreviousSkillsByCategoryData()
            }

        }
    }, [year, halfyear, department, category])

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
                    categories={[currentPeriod, previousPeriod]}
                    colors={['blue', 'rose']}
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

export default BarChartDashlet