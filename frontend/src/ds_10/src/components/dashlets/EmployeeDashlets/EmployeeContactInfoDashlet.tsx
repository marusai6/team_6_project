import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card'
import { Skeleton } from '../../ui/Skeleton'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import useFetch from '../../../hooks/useFetch'
import { useFilters } from '../../../hooks/useFilters'

type EmployeeDataType = {
    'User ID': string
    'должность': string
    'Город проживания': string
    'имя': string
    'фамилия': string
    'подразделения': string
    'E-Mail': string
}

const EmployeeContactInfoDashlet = () => {

    const [generalEmployeeData, setGeneralEmployeeData] = useState<EmployeeDataType | null>()

    // Filters
    const { employee } = useSelector((state: RootState) => state.filters)
    const { employeeFilter } = useFilters()

    const { data: employeeData, loading: loadingEmployeeData, fetchData: fetchEmployeeData } = useFetch<{ "User ID": string, 'должность': string, 'подразделения': string }>({ dimensions: ['User ID'], measures: ['должность', 'подразделения'], filters: { ...employeeFilter } })

    useEffect(() => {
        if (!loadingEmployeeData) {
            setGeneralEmployeeData({
                'User ID': employeeData[0]['User ID'],
                'должность': employeeData[0].должность,
                'подразделения': employeeData[0].подразделения,
                'Город проживания': 'Город профивания',
                'имя': "Имя",
                'фамилия': "Фамилия",
                'E-Mail': "test@mail.ru"
            })
        }
        else {
            setGeneralEmployeeData(null)
        }
    }, [loadingEmployeeData])


    useEffect(() => {
        fetchEmployeeData()
    }, [employee])

    return (
        <Card className='h-full'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className='flex justify-between w-full'>
                    {generalEmployeeData ? (
                        <p>
                            {`${generalEmployeeData.фамилия} ${generalEmployeeData.имя}`}
                        </p>
                    ) :
                        <>
                        </>
                    }
                </CardTitle>
                <CardDescription className='flex justify-between w-full pt-1'>
                    {generalEmployeeData ? (
                        <>
                            <p>{generalEmployeeData['Город проживания']}</p>
                            <p>{generalEmployeeData.должность}</p>
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
                            <h2 className='text-3xl font-semibold'>{generalEmployeeData.подразделения}</h2>
                        </> :
                        <Skeleton className='w-32 h-9' />
                    }
                </div>

            </CardContent>
        </Card>
    )
}

export default EmployeeContactInfoDashlet