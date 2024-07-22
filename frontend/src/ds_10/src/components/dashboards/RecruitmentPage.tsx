import React, { useEffect, useState } from 'react'
import EmployeeTable from '../../employees/EmployeeTable'
import Popover from '../ui/Popover'
import { Button } from '../ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import SelectWithSearch from '../ui/SelectWithSearch'
import PickedSkill from '../PickedSkill'
import { motion } from 'framer-motion'
import { urlState } from 'bi-internal/core'

type AllEmployeeData = {
    fullname: string
    title: string
    department: string
    skills: { name: string, grade: 'Novice' | 'Junior' | 'Middle' | 'Senior' | 'Expert' }[]
}

const employeeData: AllEmployeeData[] = [
    {
        fullname: 'JS TS RUST',
        title: 'sldjkf',
        department: 'sldjkf',
        skills: [
            {
                name: 'JavaScript',
                grade: 'Junior'
            },
            {
                name: 'TypeScript',
                grade: 'Expert'
            },
            {
                name: 'Rust',
                grade: 'Senior'
            },
        ]
    },
    {
        fullname: 'Python JS TS',
        title: 'sldjasdfcxkf',
        department: 'sldjkf',
        skills: [
            {
                name: 'JavaScript',
                grade: 'Junior'
            },
            {
                name: 'TypeScript',
                grade: 'Expert'
            },
            {
                name: 'Python',
                grade: 'Middle'
            },
        ]
    },
    {
        fullname: 'Python Rust JS',
        title: 'sldjvzxvzxkf',
        department: 'sldjkf',
        skills: [
            {
                name: 'JavaScript',
                grade: 'Junior'
            },
            {
                name: 'Python',
                grade: 'Middle'
            },
            {
                name: 'Rust',
                grade: 'Senior'
            },
        ]
    },
    {
        fullname: 'Python Rust',
        title: 'sldjkvnjuiyf',
        department: 'sldjkf',
        skills: [
            {
                name: 'Python',
                grade: 'Middle'
            },
            {
                name: 'Rust',
                grade: 'Senior'
            },
        ]
    },
]

const skills = ['JavaScript', 'TypeScript', 'Python', 'Rust']

export type GradeType = 'any' | 'Использовал в проекте' | 'Novice' | 'Junior' | 'Middle' | 'Senior' | 'Expert'
export type SkillType = { name: string, grade: GradeType }

const RecruitmentPage = () => {

    const [open, setOpen] = useState(false)
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


    const finalData = employeeData.filter((employee) => filterEmployee(employee)).map((employee) => ({ fullname: employee.fullname, department: employee.department, title: employee.title }))

    function filterEmployee(employee: AllEmployeeData) {
        const employeeSkills = employee.skills.map((skill) => skill.name)
        for (let i = 0; i < pickedSkills.length; i++) {
            if (!employeeSkills.includes(pickedSkills[i].name)) return false
        }
        return true
    }

    return (
        <div className='px-20 py-4 flex-1 bg-background space-y-4'>

            <div className='flex gap-4'>
                <Popover setOpen={setOpen}>
                    <Popover.Trigger setOpen={setOpen}>
                        <Button variant='outline' className='w-fit h-10'>
                            Выбрать навыки
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content open={open} top='2.9rem' align='center'>
                        <SelectWithSearch
                            options={skills}
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

            <div className='flex gap-2'>
                <EmployeeTable employeeData={finalData} />

                <Card className='w-1/3'>
                    <CardHeader>
                        <CardTitle>
                            Имя Сотрудника
                        </CardTitle>
                        <CardDescription>
                            Должность
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            Все навыки сотрудника
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default RecruitmentPage