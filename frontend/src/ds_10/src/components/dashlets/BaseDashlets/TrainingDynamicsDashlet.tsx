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

const TrainingDynamicsDashlet = () => {

    const ref = useRef()

    // Filters
    const { year, halfyear, category, skill, department } = useSelector((state: RootState) => state.filters)
    const { currentPeriodFilter, previousPeriodFilter, categoryFilter, skillFilter, departmentFilter, isNotHiredFilter } = useFilters()

    const { data: currentPeriodTrainingData, loading: loadingCurrentPeriodTrainingData, fetchData: fetchCurrentPeriodTrainingData } = useFetch<{ growth: number }>({ dimensions: [], measures: ['sum(growth)'], filters: { ...currentPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter, ...isNotHiredFilter } })
    const currentPeriodTraining = !loadingCurrentPeriodTrainingData ? currentPeriodTrainingData[0].growth || '0' : undefined

    const { data: previousPeriodTrainingData, loading: loadingPreviousPeriodTrainingData, fetchData: fetchPreviousPeriodTrainingData } = useFetch<{ growth: number }>({ dimensions: [], measures: ['sum(growth)'], filters: { ...previousPeriodFilter, ...categoryFilter, ...skillFilter, ...departmentFilter, ...isNotHiredFilter } })
    const previousPeriodTraining = !loadingPreviousPeriodTrainingData ? previousPeriodTrainingData[0].growth || '0' : undefined

    useEffect(() => {
        if (year) {
            fetchCurrentPeriodTrainingData()
            fetchPreviousPeriodTrainingData()
        }
    }, [year, halfyear, category, skill, department])

    // Dynamics Calculation
    const [dynamics, setDynamics] = useState(0)

    useEffect(() => {
        if (!loadingCurrentPeriodTrainingData && !loadingPreviousPeriodTrainingData) {
            setDynamics(+((+currentPeriodTraining - +previousPeriodTraining) / +previousPeriodTraining * 100).toFixed(2))
        }
    }, [loadingCurrentPeriodTrainingData, loadingPreviousPeriodTrainingData])

    return (
        <Card ref={ref} className='h-full'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className='flex justify-between w-full'>
                    Динамика обучения сотрудников
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
                        {currentPeriodTraining ?
                            <>
                                <h2 className='text-3xl font-semibold'>{defaultDataFormatter(+currentPeriodTraining)}</h2>
                                <span className='text-xl font-medium'>{getNoun(+currentPeriodTraining, 'грейд', 'грейда', 'грейдов')}</span>
                            </> :
                            <Skeleton className='w-32 h-9' />
                        }
                    </div>
                    <Badge number={dynamics} isLoading={loadingCurrentPeriodTrainingData || loadingPreviousPeriodTrainingData} />
                </div>
            </CardContent>
        </Card>
    )
}

export default TrainingDynamicsDashlet