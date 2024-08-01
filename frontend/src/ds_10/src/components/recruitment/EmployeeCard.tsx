import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { GeneralEmployeeType, Skills } from '../dashboards/RecruitmentPage'
import { useEmployeeGeneralSkills } from '../../hooks/useEmployeeGeneralSkills'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import useFetch from '../../hooks/useFetch'
import { useFilters } from '../../hooks/useFilters'
import LevelGroupSection from './LevelGroupSection'

type SkillsByLevelType = {
    level: string;
    skills: string[];
}[]

type GroupedEmployeeSkillData = {
    [key: string]: Skills
}

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

const EmployeeCard = ({ selectedEmployeeData, employeeSkills, pickedSkillNames }: { selectedEmployeeData: GeneralEmployeeType, employeeSkills: Skills, pickedSkillNames: string[] }) => {

    const { employee } = useSelector((state: RootState) => state.filters)
    const { groupedGeneralSkillData } = useEmployeeGeneralSkills()

    const skillCategories = ["Языки ", "Предметные области ", "Отрасли ", 'Образование ']


    return (
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
                    {employee && employeeSkills &&
                        groupBySkillLevel(employeeSkills).map((levelGroup) => {
                            return <LevelGroupSection levelGroup={levelGroup} pickedSkillNames={pickedSkillNames} key={`${employee}-${levelGroup.level}`} />
                        })}
                </div>
            </CardContent>
        </Card>
    )
}

export default EmployeeCard