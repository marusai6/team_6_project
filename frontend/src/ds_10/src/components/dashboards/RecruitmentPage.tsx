import React, { useEffect, useState } from 'react'
import EmployeeTable from '../../employees/EmployeeTable'
import Popover from '../ui/Popover'
import { Button } from '../ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import SelectWithSearch from '../ui/SelectWithSearch'
import PickedSkill from '../PickedSkill'
import { motion } from 'framer-motion'
import { urlState } from 'bi-internal/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import useFetch from '../../hooks/useFetch'
import LevelGroupSection from '../LevelGroupSection'
import { ScrollArea } from '../ui/scroll-area'

type SkillsGroupedByLevelType = {
    [key: string]: string[]
}

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
    'User ID': string
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

const RecruitmentPage = () => {

    const [open, setOpen] = useState(false)

    const { employee } = useSelector((state: RootState) => state.filters)

    // All Skills Options
    const { skillsByCategories } = useSelector((state: RootState) => state.filterOptions)

    const [allSkillsOptions, setAllSkillsOptions] = useState<string[]>([])

    const getAllSkills = () => {
        let allSkills = []
        Object.values(skillsByCategories).forEach((skills) => allSkills = allSkills.concat(skills))
        const allSkillsSet = new Set(allSkills)
        return Array.from(allSkillsSet)
    }

    useEffect(() => {
        if (skillsByCategories) {
            setAllSkillsOptions(getAllSkills())
        }
    }, [skillsByCategories])


    // Handling Picked Skills and their grades

    const [pickedSkills, setPickedSkills] = useState<SkillType[]>([])

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

    const currentLevelFilter = { 'current_level': ['=', 'true'] }

    const { data: allEmployeesData, loading: loadingAllEmployeesData, fetchData: fetchAllEmployeesData } = useFetch<{ 'User ID': string, levels_n_level: number, knows_название: string, period_название: string }>({ dimensions: ['User ID'], measures: ['levels_n_level', 'knows_название', 'period_название'], filters: { levels_n_level: ['!=', null], ...currentLevelFilter } })
    const { data: generalEmployeeData, loading: loadingGeneralEmployeeData, fetchData: fetchGeneralEmployeeData } = useFetch<{ 'User ID': string, подразделения: string, должность: string }>({ dimensions: ['User ID', 'подразделения', 'должность'], measures: [], filters: { levels_n_level: ['!=', null] } })

    const [employeeSkillsData, setEmployeeSkillsData] = useState<GroupedEmployeeSkillData>()

    console.log(employeeSkillsData)
    useEffect(() => {
        if (!loadingAllEmployeesData) {
            const result = groupByUserId(allEmployeesData.filter((el) => el.period_название.length == 4))
            setEmployeeSkillsData(result)
        }
    }, [loadingAllEmployeesData])

    useEffect(() => {
        fetchAllEmployeesData()
        fetchGeneralEmployeeData()
    }, [])

    useEffect(() => {
        if (employeeSkillsData) {
            const result = []
            for (const [key, value] of Object.entries(employeeSkillsData)) {
                if (filterEmployeeSkills(value)) {
                    result.push(+key)
                }
            }
            setFilteredEmployees(generalEmployeeData.filter((employee) => result.includes(employee['User ID'])))
        }
    }, [employeeSkillsData, pickedSkills])

    const [filteredEmployees, setFilteredEmployees] = useState([])

    function filterEmployeeSkills(skills: Skills) {
        for (let i = 0; i < pickedSkills.length; i++) {
            if (!skills[pickedSkills[i].name] || skills[pickedSkills[i].name] < pickedSkills[i].level) {
                return false
            }
        }
        return true
    }

    return (
        <ScrollArea className="px-20 flex-1 w-full bg-background py-4 overflow-y-hidden">
            <div className='w-full flex gap-4'>

                <div className='flex flex-col gap-4 w-2/3'>
                    <div className='flex gap-3 w-full'>
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
                                        setPickedSkills((prev) => [...prev, { name: value, level: 1 }])
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
                    <EmployeeTable employeeData={filteredEmployees} />
                </div>

                <Card className='w-1/3 h-fit'>
                    <CardHeader>
                        <CardTitle>
                            Фамилия Имя
                        </CardTitle>
                        <CardDescription>
                            {employee}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='h-full'>
                        <div className='space-y-3 h-full'>
                            {employee && employeeSkillsData &&
                                groupBySkillLevel(employeeSkillsData[employee]).map((levelGroup) => {
                                    return <LevelGroupSection levelGroup={levelGroup} key={`${employee}-${levelGroup.level}`} />
                                })}
                        </div>
                    </CardContent>
                </Card>

            </div>

        </ScrollArea>
    )
}

export default RecruitmentPage