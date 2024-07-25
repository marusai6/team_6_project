import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import ExportToPNGButton from '../exportButtons/ExportToPNGButton'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import useFetch from '../../hooks/useFetch'
import { defaultDataFormatter, getNoun } from '../../lib/utils'
import { parseISO, format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Skeleton } from '../ui/Skeleton'

type EmployeeFetchData = {
    'User ID': string
    date_first: string
    сотрудники_дар_активность: boolean
    growth: number
    period_название: string
}

type EmployeeData = {
    'User ID': string
    grades: number
    hiredDate: string
    isFired: boolean
}

const GeneralEmpoyeeDashlet = () => {

    // Filters
    const { employee } = useSelector((state: RootState) => state.filters)

    const employeeFilter = { 'User ID': ['=', employee] }

    const { data: employeeData, loading: loadingEmployeeData, fetchData: fetchEmployeeData } = useFetch<EmployeeFetchData>({ dimensions: ['User ID'], measures: ['date_first', 'сотрудники_дар_активность', 'sum(growth)', 'period_название'], filters: { ...employeeFilter } })

    const [generalEmployeeData, setGeneralEmployeeData] = useState<EmployeeData | null>()

    const getEmployeeData = (data: EmployeeFetchData[]) => {
        let hiredDate = new Date().toISOString().split('T')[0]
        let employeeGrades = 0
        data.forEach((employee) => {
            if (employee.date_first < hiredDate) {
                hiredDate = employee.date_first
            }
            if (employee.period_название.length == 4) {
                employeeGrades += employee.growth
            }
        })
        setGeneralEmployeeData(
            {
                'User ID': data[0]['User ID'],
                grades: employeeGrades,
                hiredDate: format(parseISO(hiredDate), 'd MMMM yyyy', { locale: ru }),
                isFired: !data[0].сотрудники_дар_активность
            })
    }

    useEffect(() => {
        if (!loadingEmployeeData) {
            getEmployeeData(employeeData)
        }
        else {
            setGeneralEmployeeData(null)
        }
    }, [loadingEmployeeData])


    useEffect(() => {
        fetchEmployeeData()
    }, [employee])

    // Refs
    const ref = useRef()

    return (
        <Card ref={ref} className='h-full'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className='flex justify-between w-full'>
                    Динамика развития
                    <ExportToPNGButton exportRef={ref} />
                </CardTitle>
                <CardDescription className='flex justify-between w-full pt-1'>
                    {generalEmployeeData ? (
                        <>
                            <p>{`Трудоустроен: ${generalEmployeeData.hiredDate}`}</p>
                            <p>{generalEmployeeData.isFired ? 'Уволен' : 'Работает'}</p>
                        </>
                    ) : (
                        <>
                            <Skeleton className='w-40 h-5' />
                            <Skeleton className='w-10 h-5' />
                        </>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-2 flex-1'>
                <div className='flex gap-2 items-end'>
                    {generalEmployeeData ?
                        <>
                            <h2 className='text-3xl font-semibold'>{defaultDataFormatter(+generalEmployeeData.grades)}</h2>
                            <span className='text-xl font-medium'>{getNoun(+generalEmployeeData.grades, 'грейд', 'грейда', 'грейдов')}</span>
                        </> :
                        <Skeleton className='w-32 h-9' />
                    }
                </div>

            </CardContent>
        </Card>
    )
}

export default GeneralEmpoyeeDashlet
