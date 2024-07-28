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


const HiringDynamicsDashlet = () => {

    const ref = useRef()

    const { year, halfyear, category, skill, department } = useSelector((state: RootState) => state.filters)
    const { currentPeriodFilter, previousPeriodFilter, categoryFilter, skillFilter, departmentFilter, isHiredFilter } = useFilters()

    const { data: currentPeriodHiringData, loading: loadingCurrentPeriodHiringData, fetchData: fetchCurrentPeriodHiringData } = useFetch<{ growth: number }>({ dimensions: ["User ID"], measures: [], filters: { ...currentPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter, ...isHiredFilter } })
    const currentPeriodHiring = !loadingCurrentPeriodHiringData ? currentPeriodHiringData.length || '0' : undefined

    const { data: previousPeriodHiringData, loading: loadingPreviousPeriodHiringData, fetchData: fetchPreviousPeriodHiringData } = useFetch<{ growth: number }>({ dimensions: ["User ID"], measures: [], filters: { ...previousPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter, ...isHiredFilter } })
    const previousPeriodHiring = !loadingPreviousPeriodHiringData ? previousPeriodHiringData.length || '0' : undefined

    useEffect(() => {
        if (year) {
            fetchCurrentPeriodHiringData()
            fetchPreviousPeriodHiringData()
        }
    }, [year, halfyear, category, skill, department])

    // Dynamics Calculation
    const [dynamics, setDynamics] = useState(0)

    useEffect(() => {
        if (!loadingCurrentPeriodHiringData && !loadingPreviousPeriodHiringData) {
            setDynamics(+((+currentPeriodHiring - +previousPeriodHiring) / +previousPeriodHiring * 100).toFixed(2))
        }
    }, [loadingCurrentPeriodHiringData, loadingPreviousPeriodHiringData])

    return (
        <Card ref={ref} className='h-full'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className='flex justify-between w-full'>
                    Динамика найма сотрудников
                    <ExportToPNGButton exportRef={ref} />
                </CardTitle>
                <CardDescription className='flex justify-between w-full pt-1'>
                    <p>{`Нанято за ${year} ${halfyear !== 'both' ? `${halfyear}-е п.` : ''}`}</p>
                    <p>{`отношение к ${halfyear === '2' ? year : +year - 1} ${halfyear !== 'both' ? `${halfyear === '1' ? '2' : '1'}-е п.` : ''}`}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center justify-between'>
                    <div className='flex items-end gap-2'>
                        {currentPeriodHiring ? (
                            <>
                                <h2 className='text-3xl font-semibold'>{defaultDataFormatter(+currentPeriodHiring)}</h2>
                                <span className='text-xl font-medium'>{getNoun(+currentPeriodHiring, 'человек', 'человека', 'человек')}</span>
                            </>
                        ) : <Skeleton className='w-32 h-9' />
                        }

                    </div>
                    <Badge number={dynamics} isLoading={loadingCurrentPeriodHiringData || loadingPreviousPeriodHiringData} />
                </div>
            </CardContent>
        </Card>
    )
}

export default HiringDynamicsDashlet