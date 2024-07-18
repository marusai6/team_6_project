import React, { useState } from 'react'
import EmployeeTable from '../employees/EmployeeTable'
import { Employee } from '../employees/columns'
import Popover from './ui/Popover'
import { Button } from './ui/Button'
import { employee } from '../data/data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import SelectWithSearch from './SelectWithSearch'
import { X } from 'lucide-react'

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

function remove<T>(array: T[], value: T) {
    const index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}

const skills = ['JavaScript', 'TypeScript', 'Python', 'Rust']


const SecondDashboard = () => {

    const [open, setOpen] = useState(false)
    const [pickedSkills, setPickedSkills] = useState<string[]>([])

    const finalData = employeeData.filter((employee) => filterEmployee(employee)).map((employee) => ({ fullname: employee.fullname, department: employee.department, title: employee.title }))

    function filterEmployee(employee: AllEmployeeData) {
        const employeeSkills = employee.skills.map((skill) => skill.name)
        for (let i = 0; i < pickedSkills.length; i++) {
            if (!employeeSkills.includes(pickedSkills[i])) return false
        }
        return true
    }

    return (
        <div className='px-20 py-4 flex-1 bg-background space-y-4'>

            <div className='flex gap-4'>
                <Popover setOpen={setOpen}>
                    <Popover.Trigger setOpen={setOpen}>
                        <Button variant='outline' className='w-fit'>
                            Выбрать навыки
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content open={open} top='2.5rem' align='center'>
                        <SelectWithSearch options={skills} onClick={(value: string) => {
                            setPickedSkills((prev) => [...prev, value])
                        }} />
                    </Popover.Content>
                </Popover>

                <div className='flex gap-2 w-fit'>
                    {pickedSkills.map((skill) => {
                        return (
                            <div className='px-2 py-1 flex gap-1 items-center bg-secondary text-primary rounded cursor-pointer' key={`skill-${skill}`} >
                                <p>{skill}</p>
                                <X size={18}
                                    className='cursor-pointer'
                                    onClick={() => {
                                        setPickedSkills((prev) => prev.filter(item => item !== skill))
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
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

export default SecondDashboard