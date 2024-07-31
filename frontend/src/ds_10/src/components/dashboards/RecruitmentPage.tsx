import React, { useEffect, useState } from 'react'
import EmployeeTable from '../../employees/EmployeeTable'
import Popover from '../ui/Popover'
import { Button } from '../ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import SelectWithSearch from '../ui/SelectWithSearch'
import PickedSkill from '../PickedSkill'
import { motion } from 'framer-motion'
import { urlState } from 'bi-internal/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import useFetch from '../../hooks/useFetch'
import LevelGroupSection from '../LevelGroupSection'
import { ScrollArea } from '../ui/scroll-area'
import { useFilters } from '../../hooks/useFilters'
import useAllSkillOptions from '../../hooks/useAllSkillOptions'
import { faker } from '@faker-js/faker/locale/ru'
import { useEmployeeGeneralSkills } from '../../hooks/useEmployeeGeneralSkills'
import ExportToSLSXButton from '../exportButtons/ExportToXLSXButton'

type SkillsByLevelType = {
    level: string;
    skills: string[];
}[]

function groupBySkillLevel(employee: GroupedEmployeeSkillData[number]): SkillsByLevelType {
    if (!employee) return []
    const result = [
        { level: 'Использовал в проекте', skills: [] },
        { level: 'Novice', skills: [] },
        { level: 'Junior', skills: [] },
        { level: 'Middle', skills: [] },
        { level: 'Senior', skills: [] },
        { level: 'Expert', skills: [] }
    ]
    for (const [skill, level] of Object.entries(employee)) {
        result[level - 1].skills.push(skill)
    }
    return result.reverse()
}

function groupByUserId(arr: EmployeeRowData[]): GroupedEmployeeSkillData {
    return arr.reduce((acc, curr) => {
        if (!acc[curr['User ID']]) {
            acc[curr['User ID']] = {};
        }
        acc[curr['User ID']][curr.knows_название] = curr.levels_n_level
        return acc;
    }, {});
}

export type GradeType = 'Использовал в проекте' | 'Novice' | 'Junior' | 'Middle' | 'Senior' | 'Expert'
export type SkillType = { name: string, level: number }

type EmployeeRowData = {
    'User ID': number
    knows_название: string
    levels_n_level: number
}

type Skills = {
    [key: string]: number
}

type GroupedEmployeeSkillData = {
    [key: string]: Skills
}

export const GradesToLevelMap = new Map([
    ['Использовал в проекте', 1],
    ['Novice', 2],
    ['Junior', 3],
    ['Middle', 4],
    ['Senior', 5],
    ['Expert', 6],
])

type GeneralEmployeeType = {
    id: number;
    name: string;
    email: string;
    title: string;
    department: string;
    city: string;
}

const RecruitmentPage = () => {

    const [open, setOpen] = useState(false)

    const { employee } = useSelector((state: RootState) => state.filters)

    const { allSkillsOptions } = useAllSkillOptions()
    // Handling Picked Skills and their Grades

    const [pickedSkills, setPickedSkills] = useState<SkillType[]>([])
    const pickedSkillNames = pickedSkills.map((el) => el.name)

    useEffect(() => {
        const urlPickedSkills = urlState.getModel().pickedSkills
        if (urlPickedSkills) {
            setPickedSkills(JSON.parse(urlPickedSkills))
        }
    }, [])

    useEffect(() => {
        urlState.updateModel({ pickedSkills: JSON.stringify(pickedSkills) })
    }, [pickedSkills])


    // Fetching Employee Data

    const { leveledSkillsFilter, currentLevelFilter, yearPeriodsFilter } = useFilters()

    const { data: allEmployeesRawData, loading: loadingAllEmployeesRawData } = useFetch<{ 'User ID': number, levels_n_level: number, knows_название: string, period_название: string }>({ dimensions: ['User ID'], measures: ['levels_n_level', 'knows_название', 'period_название'], filters: { ...leveledSkillsFilter, ...currentLevelFilter, ...yearPeriodsFilter }, queryKey: 'AllCurrentEmployeeSkillsData' })
    const { data: generalEmployeeData, loading: loadingGeneralEmployeeData } = useFetch<{ 'User ID': number, подразделения: string, должность: string }>({ dimensions: ['User ID', 'подразделения', 'должность'], measures: [], filters: { ...leveledSkillsFilter }, queryKey: 'GeneralEmployeeTableData' })

    const { groupedGeneralSkillData } = useEmployeeGeneralSkills()

    const [employeeSkillsData, setEmployeeSkillsData] = useState<GroupedEmployeeSkillData>()
    const [generalEmployee, setGeneralEmployee] = useState<GeneralEmployeeType[]>([])

    useEffect(() => {
        if (!loadingAllEmployeesRawData) {
            const result = groupByUserId(allEmployeesRawData)
            setEmployeeSkillsData(result)
        }
    }, [allEmployeesRawData])

    useEffect(() => {
        if (!loadingGeneralEmployeeData) {
            setGeneralEmployee(generalEmployeeData.map((employee) => {
                return ({
                    id: employee['User ID'],
                    name: faker.person.firstName(),
                    email: faker.internet.email(),
                    title: employee.должность,
                    department: employee.подразделения,
                    city: faker.location.city(),
                })
            }))
        }
    }, [generalEmployeeData])


    // Preparing Final Employee Data For the table (based on Filters)
    const [filteredEmployees, setFilteredEmployees] = useState<GeneralEmployeeType[]>([])

    useEffect(() => {
        if (employeeSkillsData && generalEmployee.length) {
            const result = []
            for (const [key, value] of Object.entries(employeeSkillsData)) {
                if (filterEmployeeSkills(value)) {
                    result.push(+key)
                }
            }
            if (generalEmployeeData) {
                setFilteredEmployees(generalEmployee.filter((employee) => result.includes(employee.id)))
            }
        }
    }, [employeeSkillsData, pickedSkills, generalEmployee])


    function filterEmployeeSkills(skills: Skills) {
        for (let i = 0; i < pickedSkills.length; i++) {
            if (!skills[pickedSkills[i].name] || skills[pickedSkills[i].name] < pickedSkills[i].level) {
                return false
            }
        }
        return true
    }

    const [selectedEmployeeData, setSelectedEmployeeData] = useState<GeneralEmployeeType>(null)

    useEffect(() => {
        console.log(employee, generalEmployee)
        if (employee && generalEmployee) {
            const employeeIndex = generalEmployee.findIndex((el) => el.id === +employee)
            console.log(employeeIndex)
            if (employeeIndex !== -1) {
                console.log(generalEmployee[employeeIndex])
                setSelectedEmployeeData(generalEmployee[employeeIndex])
            }
            else {
                setSelectedEmployeeData(null)
            }
        }
    }, [generalEmployee, employee])

    const skillCategories = ["Языки ", "Предметные области ", "Отрасли ", 'Образование ']

    return (
        <ScrollArea className="px-20 flex-1 w-full bg-background py-4 overflow-y-hidden">
            <div className='w-full flex gap-4'>

                <div className='flex flex-col gap-4 w-1/2'>
                    <div className='flex gap-3 w-full'>
                        <ExportToSLSXButton exportData={filteredEmployees} />
                        <Popover setOpen={setOpen}>
                            <Popover.Trigger setOpen={setOpen}>
                                <Button variant='outline' className='w-fit h-10'>
                                    Выбрать навыки
                                </Button>
                            </Popover.Trigger>
                            <Popover.Content open={open} top='2.9rem' align='left'>
                                <SelectWithSearch
                                    options={allSkillsOptions}
                                    onClick={(value: string) => {
                                        setPickedSkills((prev) => [...prev, { name: value, level: 3 }])
                                    }}
                                    onReset={() => {
                                        setOpen(false)
                                        setPickedSkills([])
                                    }}
                                />
                            </Popover.Content>
                        </Popover>

                        <motion.div
                            className='flex gap-2 flex-wrap w-full'>
                            {pickedSkills.map((skill) => {
                                return (
                                    <PickedSkill
                                        skill={skill}
                                        onClick={() => setPickedSkills((prev) => prev.filter(item => item !== skill))}
                                        updateGrade={(skill: string, grade: GradeType) => {
                                            setPickedSkills((prev) => {
                                                return prev.map((pickedSkill) => ({ name: pickedSkill.name, level: pickedSkill.name == skill ? GradesToLevelMap.get(grade) : pickedSkill.level }))
                                            })
                                        }}
                                    />
                                )
                            })}
                        </motion.div>
                    </div>
                    <EmployeeTable employeeData={filteredEmployees.map((el) => ({ id: String(el.id), name: el.name, email: el.email }))} />
                </div>

                <Card className='w-1/2 h-fit'>
                    <CardHeader>
                        <CardTitle>
                            <div className='flex gap-4 items-end'>
                                <p>{`${selectedEmployeeData?.name}`}</p>
                                <p className='text-sm font-normal'>{selectedEmployeeData?.title}</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='h-full space-y-4'>
                        <div className='space-y-1'>
                            <p>{selectedEmployeeData?.department}</p>
                            <p>{`Город: ${selectedEmployeeData?.city}`}</p>
                            <p>{`Почта: ${selectedEmployeeData?.email}`}</p>
                        </div>

                        {groupedGeneralSkillData &&
                            <div className='space-y-2'>
                                {skillCategories.map((category) => {
                                    if (!groupedGeneralSkillData[category]) return
                                    return (
                                        <div>
                                            <h3 className='font-medium text-lg'>{category}</h3>
                                            <div className='space-y-1'>
                                                {groupedGeneralSkillData[category].map((skill) => {
                                                    return (
                                                        <p key={`${employee}-${skill.skill}`}>{`${skill.skill} - ${skill.level}`}</p>
                                                    )
                                                })}
                                            </div>
                                        </div>)
                                })}
                            </div>
                        }
                        <div className='space-y-3 h-full'>
                            {employee && employeeSkillsData &&
                                groupBySkillLevel(employeeSkillsData[employee]).map((levelGroup) => {
                                    return <LevelGroupSection levelGroup={levelGroup} pickedSkillNames={pickedSkillNames} key={`${employee}-${levelGroup.level}`} />
                                })}
                        </div>
                    </CardContent>
                </Card>

            </div>

        </ScrollArea>
    )
}

export default RecruitmentPage