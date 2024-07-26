import React, { useEffect, useState } from 'react'
import EmployeeTable from '../../employees/EmployeeTable'
import Popover from '../ui/Popover'
import { Button } from '../ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import SelectWithSearch from '../ui/SelectWithSearch'
import PickedSkill from '../PickedSkill'
import { AnimatePresence, motion } from 'framer-motion'
import { urlState } from 'bi-internal/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import useFetch from '../../hooks/useFetch'
import { ScrollArea } from '@radix-ui/react-scroll-area'

type SkillsGroupedByLevelType = {
    [key: string]: string[]
}

type SkillsByLevelType = {
    level: string;
    skills: string[];
}[]

function groupBySkillLevel(arr: GroupedEmployeeSkillData[number]): SkillsByLevelType {
    const groupedObject: SkillsGroupedByLevelType = arr.reduce((acc, curr) => {
        if (!acc[curr.level]) {
            acc[curr.level] = [];
        }
        acc[curr.level].push(curr.skill);
        return acc;
    }, {})
    const result = Object.entries(groupedObject).map((el) => {
        return { level: el[0], skills: el[1] }
    })
    console.log(result)
    return result
}

function groupByUserId(arr: EmployeeRowData[]): GroupedEmployeeSkillData {
    return arr.reduce((acc, curr) => {
        if (!acc[curr['User ID']]) {
            acc[curr['User ID']] = [];
        }
        acc[curr['User ID']].push({
            skill: curr.knowledge_название,
            level: curr.lables_n_level
        });
        return acc;
    }, {});
}


type GradeType = 'any' | 'Использовал в проекте' | 'Novice' | 'Junior' | 'Middle' | 'Senior' | 'Expert'
type SkillType = { name: string, grade: GradeType }

type EmployeeRowData = {
    'User ID': string
    knowledge_название: string
    lables_n_level: number
}

type Skill = {
    skill: string
    level: number
}

type GroupedEmployeeSkillData = {
    [key: string]: Skill[]
}

const levelsToTitlesMap = new Map([
    ['1', 'Использовал на проекте'],
    ['2', 'Novice'],
    ['3', 'Junior'],
    ['4', 'Middle'],
    ['5', 'Senior'],
    ['6', 'Expert'],
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

    const { data: allEmployeesData, loading: loadingAllEmployeesData, fetchData: fetchAllEmployeesData } = useFetch<{ 'User ID': string, lables_n_level: number, knowledge_название: string, period_название: string }>({ dimensions: ['User ID'], measures: ['lables_n_level', 'knowledge_название', 'period_название'], filters: { lables_n_level: ['!=', null], ...currentLevelFilter } })
    const { data: generalEmployeeData, loading: loadingGeneralEmployeeData, fetchData: fetchGeneralEmployeeData } = useFetch<{ 'User ID': string, подразделения: string, должность: string }>({ dimensions: ['User ID', 'подразделения', 'должность'], measures: [], filters: { lables_n_level: ['!=', null] } })

    const [employeeSkillsData, setEmployeeSkillsData] = useState<GroupedEmployeeSkillData>()

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

    // const finalData = employeeData.filter((employee) => filterEmployee(employee)).map((employee) => ({ fullname: employee.fullname, department: employee.department, title: employee.title }))

    // function filterEmployee(employee: AllEmployeeData) {
    //     const employeeSkills = employee.skills.map((skill) => skill.name)
    //     for (let i = 0; i < pickedSkills.length; i++) {
    //         if (!employeeSkills.includes(pickedSkills[i].name)) return false
    //     }
    //     return true
    // }

    return (
        <div className='px-20 py-4 flex flex-col flex-1 bg-background space-y-4'>

            <div className='flex gap-4'>
                <Popover setOpen={setOpen}>
                    <Popover.Trigger setOpen={setOpen}>
                        <Button variant='outline' className='w-fit h-10'>
                            Выбрать навыки
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content open={open} top='2.9rem' align='center'>
                        <SelectWithSearch
                            options={allSkillsOptions}
                            onClick={(value: string) => {
                                setPickedSkills((prev) => [...prev, { name: value, grade: 'any' }])
                            }}
                            onReset={() => {
                                setOpen(false)
                                setPickedSkills([])
                            }}
                        />
                    </Popover.Content>
                </Popover>

                <motion.div
                    className='flex gap-2 flex-wrap'>
                    {pickedSkills.map((skill) => {
                        return (
                            <PickedSkill
                                skill={skill}
                                onClick={() => setPickedSkills((prev) => prev.filter(item => item !== skill))}
                                updateGrade={(skill: string, grade: GradeType) => {
                                    setPickedSkills((prev) => {
                                        return prev.map((pickedSkill) => ({ name: pickedSkill.name, grade: pickedSkill.name == skill ? grade : pickedSkill.grade }))
                                    })
                                }}
                            />
                        )
                    })}
                </motion.div>
            </div>

            <div className='flex flex-1 gap-4 overflow-hidden'>
                <EmployeeTable employeeData={generalEmployeeData} />

                <Card className='w-2/5 h-full'>
                    <CardHeader>
                        <CardTitle>
                            Фамилия Имя
                        </CardTitle>
                        <CardDescription>
                            {employee}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className='space-y-3'>
                            {employee && employeeSkillsData &&
                                groupBySkillLevel(employeeSkillsData[employee]).map((levelGroup, index) => {
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            key={`${employee}-skill-${index}`}
                                            className='space-y-1'
                                        >
                                            <h3 className='text-lg font-medium'>{levelsToTitlesMap.get(levelGroup.level)}</h3>
                                            <motion.div
                                                initial={"hidden"}
                                                animate={"visible"}
                                                transition={{ staggerChildren: 0.05 }}
                                                className='flex gap-1 flex-wrap'
                                            >
                                                {levelGroup.skills.map((skill) => {
                                                    return (
                                                        <motion.p
                                                            variants={{
                                                                hidden: { opacity: 0 },
                                                                visible: { opacity: 1 }
                                                            }}
                                                            className="px-2 py-1 rounded bg-secondary" key={`${employee}-${skill}`}
                                                        >
                                                            {skill}
                                                        </motion.p>)
                                                })}
                                            </motion.div>
                                        </motion.div>
                                    )
                                })}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default RecruitmentPage