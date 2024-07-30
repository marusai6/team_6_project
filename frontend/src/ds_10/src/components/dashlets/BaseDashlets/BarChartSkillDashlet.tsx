import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { BarChart } from '@tremor/react';
import { defaultDataFormatter } from '../../../lib/utils';
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton';
import useFetch from '../../../hooks/useFetch';
import { useFilters } from '../../../hooks/useFilters';


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
            [secondArrayTitle]: array2Dict[item.name] || 0,
            [firstArrayTitle]: item.Рост,
        });
    });

    array2.forEach(item => {
        if (!categoriesSet.has(item.name)) {
            result.push({
                name: item.name,
                [secondArrayTitle]: item.Рост,
                [firstArrayTitle]: 0,
            });
        }
    });

    return result;
}

const BarChartSkillDashlet = () => {

    const ref = useRef()

    const { leveledSkillsFilter, currentPeriodFilter, previousPeriodFilter, departmentFilter, categoryFilter, currentPeriod, previousPeriod, filtersAreReady } = useFilters()

    // Knowledge Fetching
    const { data: currentSkillsData, loading: loadingCurrentSkillsData } = useFetch<{ knows_название: string, growth: number }>({ dimensions: ['knows_название'], measures: ['knows_название', 'sum(growth)'], filters: { ...leveledSkillsFilter, ...currentPeriodFilter, ...departmentFilter, ...categoryFilter }, filtersAreReady, queryKey: 'BarChartSkill' })
    const { data: previousSkillsData, loading: loadingPreviousSkillsData } = useFetch<{ knows_название: string, growth: number }>({ dimensions: ['knows_название'], measures: ['knows_название', 'sum(growth)'], filters: { ...leveledSkillsFilter, ...previousPeriodFilter, ...departmentFilter, ...categoryFilter }, filtersAreReady, queryKey: 'BarChartSkill' })

    const [skillData, setSkillData] = useState([])

    useEffect(() => {
        if (!loadingCurrentSkillsData && !loadingPreviousSkillsData) {
            const finalCurrentSkillsData = currentSkillsData ? currentSkillsData.map((skill) => ({ name: skill.knows_название, Рост: skill.growth })).sort((a, b) => b.Рост - a.Рост) : []
            const finalPreviousSkillsData = previousSkillsData ? previousSkillsData.map((skill) => ({ name: skill.knows_название, Рост: skill.growth })).sort((a, b) => b.Рост - a.Рост) : []
            setSkillData(mergeArrays(finalCurrentSkillsData, finalPreviousSkillsData, currentPeriod, previousPeriod))
        }
    }, [currentSkillsData, previousSkillsData])

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
                    data={skillData}
                    index="name"
                    categories={[previousPeriod, currentPeriod]}
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

export default BarChartSkillDashlet