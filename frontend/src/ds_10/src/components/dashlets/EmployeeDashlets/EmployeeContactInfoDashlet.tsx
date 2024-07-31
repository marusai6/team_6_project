import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card'
import { Skeleton } from '../../ui/Skeleton'
import useFetch from '../../../hooks/useFetch'
import { useFilters } from '../../../hooks/useFilters'
import { faker } from '@faker-js/faker/locale/ru';
import GeneralEmployeeSkillCategoryPopover from '../../GeneralEmployeeSkillCategoryPopover'
import { useEmployeeGeneralSkills } from '../../../hooks/useEmployeeGeneralSkills'

type EmployeeDataType = {
    'User ID': string
    'должность': string
    'Город проживания': string
    'имя': string
    'фамилия': string
    'подразделения': string
    'E-Mail': string
}

const skillCategories = ["Языки ", "Предметные области ", "Отрасли ", 'Образование ']

const EmployeeContactInfoDashlet = () => {

    const [generalEmployeeData, setGeneralEmployeeData] = useState<EmployeeDataType | null>()
    const { employeeFilter } = useFilters()

    const { data: employeeData, loading: loadingEmployeeData } = useFetch<{ "User ID": string, 'должность': string, 'подразделения': string }>({ dimensions: ['User ID', 'должность', 'подразделения'], measures: [], filters: { ...employeeFilter }, queryKey: 'EmployeeContactData' })

    const { groupedGeneralSkillData } = useEmployeeGeneralSkills()

    useEffect(() => {
        if (!loadingEmployeeData) {
            setGeneralEmployeeData({
                'User ID': employeeData[0]['User ID'],
                'должность': employeeData[0].должность,
                'подразделения': employeeData[0].подразделения,
                'Город проживания': faker.location.city(),
                'имя': faker.person.firstName(),
                'фамилия': '',
                'E-Mail': faker.internet.email()
            })
        }
        else {
            setGeneralEmployeeData(null)
        }
    }, [employeeData])

    return (
        <Card className='h-full overflow-visible'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className='flex justify-between w-full'>
                    {generalEmployeeData ? (
                        <div className='flex gap-4 items-end'>
                            <p>{`${generalEmployeeData.фамилия} ${generalEmployeeData.имя}`}</p>
                            <p className='text-sm font-normal'>{generalEmployeeData.должность}</p>
                        </div>
                    ) :
                        <Skeleton className='w-40 h-5' />
                    }
                </CardTitle>
                <CardDescription className='flex justify-between w-full pt-1'>
                    {generalEmployeeData ? (
                        <>
                            <p>{generalEmployeeData.подразделения}</p>
                            <p>{`Город: ${generalEmployeeData['Город проживания']}`}</p>
                            <p>{generalEmployeeData['E-Mail']}</p>
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
                <div className='flex gap-4'>
                    {groupedGeneralSkillData ?
                        <>
                            {skillCategories.map((category) => {
                                if (!groupedGeneralSkillData[category]) return
                                return <GeneralEmployeeSkillCategoryPopover category={category} skills={groupedGeneralSkillData[category]} />
                            })}
                        </> :
                        <Skeleton className='w-32 h-9' />
                    }
                </div>

            </CardContent>
        </Card>
    )
}

export default EmployeeContactInfoDashlet