import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card'
import Badge from '../../ui/Badge'
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton'
import { defaultDataFormatter, getNoun } from '../../../lib/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import useFetch from '../../../hooks/useFetch'
import { Skeleton } from '../../ui/Skeleton'

const GeneralDynamicsDashlet = () => {

    // Filters
    const { year, halfyear, category, skill, department } = useSelector((state: RootState) => state.filters)


    // Period Filters
    const currentPeriodWithHalfYear = halfyear === '1' ? `1п - ${year}` : `2п - ${year}`
    const previousPeriodWithHalfYear = halfyear === '1' ? `2п - ${+year - 1}` : `1п - ${year}`

    const currentPeriod = halfyear === 'both' ? year : currentPeriodWithHalfYear
    const previousPeriod = halfyear === 'both' ? String(+year - 1) : previousPeriodWithHalfYear

    const currentPeriodFilter = { 'period_название': ['=', currentPeriod] }
    const previousPeriodFilter = { 'period_название': ['=', previousPeriod] }


    const categoryFilter = category ? { 'category_know_название': ['=', category] } : null
    const skillFilter = skill ? { 'knowledge_название': ['=', skill] } : null
    const departmentFilter = department ? { 'подразделения': ['=', department] } : null

    const { data: currentPeriodGrowthData, loading: loadingCurrentPeriodGrowthData, fetchData: fetchCurrentPeriodGrowthData } = useFetch<{ growth: number }>({ dimensions: [], measures: ['sum(growth)'], filters: { lables_n_level: ['!=', null], ...currentPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter } })
    const currentPeriodGrowth = !loadingCurrentPeriodGrowthData ? currentPeriodGrowthData[0].growth || '0' : undefined

    const { data: previousPeriodGrowthData, loading: loadingPreviousPeriodGrowthData, fetchData: fetchPreviousPeriodGrowthData } = useFetch<{ growth: number }>({ dimensions: [], measures: ['sum(growth)'], filters: { lables_n_level: ['!=', null], ...previousPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter } })
    const previousPeriodGrowth = !loadingPreviousPeriodGrowthData ? previousPeriodGrowthData[0].growth || '0' : undefined

    useEffect(() => {
        if (year) {
            fetchCurrentPeriodGrowthData()
            fetchPreviousPeriodGrowthData()
        }
    }, [year, halfyear, category, skill, department])


    // Dynamics Calculation
    const [dynamics, setDynamics] = useState(0)

    useEffect(() => {
        if (!loadingCurrentPeriodGrowthData && !loadingPreviousPeriodGrowthData) {
            setDynamics(+((+currentPeriodGrowth - +previousPeriodGrowth) / +previousPeriodGrowth * 100).toFixed(2))
        }
    }, [loadingCurrentPeriodGrowthData, loadingPreviousPeriodGrowthData])


    const ref = useRef()

    return (
        <Card ref={ref} className='h-full'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className='flex justify-between w-full'>
                    Общая динамика
                    <ExportToPNGButton exportRef={ref} />
                </CardTitle>
                <CardDescription className='flex justify-between w-full pt-1'>
                    <p>{`Прирост за ${year} ${halfyear !== 'both' ? `${halfyear}-е п.` : ''}`}</p>
                    <p>{`отношение к ${halfyear === '2' ? year : +year - 1} ${halfyear !== 'both' ? `${halfyear === '1' ? '2' : '1'}-е п.` : ''}`}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center justify-between'>
                    <div className='flex items-end gap-2'>
                        {currentPeriodGrowth ?
                            <>
                                <h2 className='text-3xl font-semibold'>{defaultDataFormatter(+currentPeriodGrowth)}</h2>
                                <span className='text-xl font-medium'>{getNoun(+currentPeriodGrowth, 'грейд', 'грейда', 'грейдов')}</span>
                            </> :
                            <Skeleton className='w-32 h-9' />
                        }
                    </div>
                    <Badge number={dynamics} isLoading={loadingCurrentPeriodGrowthData || loadingPreviousPeriodGrowthData} />
                </div>
            </CardContent>
        </Card>
    )
}

export default GeneralDynamicsDashlet