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

function mergeArrays(array1: { category_know_название: string, sum: number, подразделения: string }[], array2: { category_know_название: string, sum: number, "User ID": number }[], firstArrayTitle: string, secondArrayTitle: string) {
    const result = [];

    array1 = array1.sort((a, b) => b.sum - a.sum)

    const array2Dict = array2.reduce((acc, item) => {
        acc[item.category_know_название] = +(item.sum / item['User ID']).toFixed(1);
        return acc;
    }, {});

    const categoriesSet = new Set();

    array1.forEach(item => {
        categoriesSet.add(item.category_know_название);
        result.push({
            name: item.category_know_название,
            [secondArrayTitle]: array2Dict[item.category_know_название] || 0,
            [firstArrayTitle]: item.sum,
        });
    });

    array2.forEach(item => {
        if (!categoriesSet.has(item.category_know_название)) {
            result.push({
                name: item.category_know_название,
                [secondArrayTitle]: +(item.sum / item['User ID']).toFixed(1),
                [firstArrayTitle]: 0,
            });
        }
    });

    return result.map((el) => ({ ...el, name: shortCategoryVariants.get(el.name) }));
}

const EmployeeCategoryBarChartDashlet = () => {

    const ref = useRef()

    const { leveledSkillsFilter, employeeFilter, currentLevelFilter, yearPeriodsFilter } = useFilters()

    // Category Fetching
    const { data: currentCategoryData, loading: loadingCurrentCategoryData } = useFetch<{ category_know_название: string, sum: number, подразделения: string }>({ dimensions: ['category_know_название'], measures: ['sum(levels_n_level)', 'подразделения'], filters: { ...leveledSkillsFilter, ...employeeFilter, ...currentLevelFilter, ...yearPeriodsFilter }, queryKey: 'EmployeeBarChartCategory' })
    const [employeeDepartment, setEmployeeDepartment] = useState('')

    // Fetching Average Department value
    const { data: sumByDepartmentData, loading: loadingSumByDepartmentData } = useFetch<{ category_know_название: string, sum: number, "User ID": number }>({ dimensions: ['category_know_название'], measures: ['sum(levels_n_level)', 'uniq("User ID")'], filters: { ...leveledSkillsFilter, ...currentLevelFilter, ...yearPeriodsFilter, 'подразделения': ['=', employeeDepartment] }, filtersAreReady: !!employeeDepartment, queryKey: 'AverageDepartmentCategories' })

    const [finalData, setFinalData] = useState([])

    useEffect(() => {
        if (sumByDepartmentData && currentCategoryData) {
            if (currentCategoryData.length) {
                setFinalData(mergeArrays(currentCategoryData, sumByDepartmentData, 'Сотрудник', 'Среднее по отделу'))
            }
            else {
                setFinalData([])
            }
        }
    }, [sumByDepartmentData, currentCategoryData])

    useEffect(() => {
        if (currentCategoryData?.length) {
            setEmployeeDepartment(currentCategoryData[0].подразделения)
        }
    }, [currentCategoryData])


    return (
        <Card className='flex flex-col h-full'>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Области знаний</CardTitle>
                    <CardDescription>сравнительный анализ с подразделением</CardDescription>
                </div>
                <ExportToPNGButton exportRef={ref} />
            </CardHeader>
            <CardContent ref={ref} className='flex-1'>
                <BarChart
                    data={finalData}
                    index="name"
                    categories={["Среднее по отделу", "Сотрудник"]}
                    colors={['blue', 'rose']}
                    valueFormatter={defaultDataFormatter}
                    yAxisWidth={48}
                    showYAxis={true}
                    yAxisLabel='Грейды'
                    className='text-sm h-full'
                    noDataText='Нет данных'
                    showAnimation={true}
                />
            </CardContent>
        </Card>
    )
}

export default EmployeeCategoryBarChartDashlet