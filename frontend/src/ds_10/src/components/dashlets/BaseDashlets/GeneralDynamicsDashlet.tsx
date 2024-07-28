import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card'
import Badge from '../../ui/Badge'
import ExportToPNGButton from '../../exportButtons/ExportToPNGButton'
import { defaultDataFormatter, getNoun } from '../../../lib/utils'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import useFetch from '../../../hooks/useFetch'
import { Skeleton } from '../../ui/Skeleton'
import { useFilters } from '../../../hooks/useFilters'

const GeneralDynamicsDashlet = () => {

    const { year, halfyear } = useSelector((state: RootState) => state.filters)
    const { leveledSkillsFilter, currentPeriodFilter, previousPeriodFilter, categoryFilter, skillFilter, departmentFilter, filtersAreReady } = useFilters()

    const { data: currentPeriodGrowthData, loading: loadingCurrentPeriodGrowthData } = useFetch<{ growth: number }>({ dimensions: [], measures: ['sum(growth)'], filters: { ...leveledSkillsFilter, ...currentPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter }, filtersAreReady, queryKey: 'GeneralData' })
    const currentPeriodGrowth = currentPeriodGrowthData && !loadingCurrentPeriodGrowthData ? currentPeriodGrowthData[0].growth || '0' : undefined

    const { data: previousPeriodGrowthData, loading: loadingPreviousPeriodGrowthData } = useFetch<{ growth: number }>({ dimensions: [], measures: ['sum(growth)'], filters: { ...leveledSkillsFilter, ...previousPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter }, filtersAreReady, queryKey: 'GeneralData' })
    const previousPeriodGrowth = previousPeriodGrowthData && !loadingPreviousPeriodGrowthData ? previousPeriodGrowthData[0].growth || '0' : undefined


    // Dynamics Calculation
    const [dynamics, setDynamics] = useState(0)

    useEffect(() => {
        if (!loadingCurrentPeriodGrowthData && !loadingPreviousPeriodGrowthData) {
            setDynamics(+((+currentPeriodGrowth - +previousPeriodGrowth) / +previousPeriodGrowth * 100).toFixed(2))
        }
    }, [currentPeriodGrowthData, previousPeriodGrowthData])


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