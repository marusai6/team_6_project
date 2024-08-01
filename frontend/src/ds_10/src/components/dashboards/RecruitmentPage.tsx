import React, { useEffect, useMemo, useState } from 'react'
import EmployeeTable from '../../employees/EmployeeTable'
import { urlState } from 'bi-internal/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { ScrollArea } from '../ui/scroll-area'
import ExportToSLSXButton from '../exportButtons/ExportToXLSXButton'
import SkillsPopoverSelect from '../recruitment/SkillsPopoverSelect'
import PickedSKillsDisplay from '../recruitment/PickedSKillsDisplay'
import EmployeeCard from '../recruitment/EmployeeCard'
import EmployeeCardPlaceholder from '../recruitment/EmployeeCardPlaceholder'
import { useSkillsOfAllEmployees } from '../../hooks/useSkillsOfAllEmployees'
import { useGeneralEmployeeData } from '../../hooks/useGeneralEmployeeData'
import { Employee } from '../../employees/columns'

export type GradeType = 'Использовал в проекте' | 'Novice' | 'Junior' | 'Middle' | 'Senior' | 'Expert'
export type SkillType = { name: string, level: number }

export type Skills = {
    [key: string]: number
}

export type GeneralEmployeeType = {
    id: number;
    name: string;
    email: string;
    title: string;
    department: string;
    city: string;
    isFired: boolean;
}

const RecruitmentPage = () => {

    const { employee } = useSelector((state: RootState) => state.filters)

    // Handling Picked Skills and their Grades

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


    // Fetching Employees Data

    const { employeeSkillsData } = useSkillsOfAllEmployees()
    const { generalEmployee } = useGeneralEmployeeData()

    // Preparing Final Employee Data For the table (based on Filters)

    const filteredEmployees = useMemo<Employee[]>(() => {
        if (employeeSkillsData && generalEmployee.length) {
            const result = []
            for (const [key, value] of Object.entries(employeeSkillsData)) {
                if (filterEmployeeSkills(value)) {
                    result.push(+key)
                }
            }
            if (generalEmployee) {
                return generalEmployee.filter((employee) => result.includes(employee.id)).map((employee) => ({ id: String(employee.id), name: employee.name, email: employee.email }))
            }
            return []
        }
        return []
    }, [employeeSkillsData, pickedSkills, generalEmployee])

    function filterEmployeeSkills(skills: Skills) {
        for (let i = 0; i < pickedSkills.length; i++) {
            if (!skills[pickedSkills[i].name] || skills[pickedSkills[i].name] < pickedSkills[i].level) {
                return false
            }
        }
        return true
    }

    // Handling selected Employee
    const [selectedEmployeeData, setSelectedEmployeeData] = useState<GeneralEmployeeType>(null)

    useEffect(() => {
        if (employee && generalEmployee) {
            const employeeIndex = generalEmployee.findIndex((el) => el.id === +employee)
            if (employeeIndex !== -1) {
                setSelectedEmployeeData(generalEmployee[employeeIndex])
            }
            else {
                setSelectedEmployeeData(null)
            }
        }
    }, [generalEmployee, employee])

    return (
        <ScrollArea className="px-20 flex-1 w-full bg-background py-4 overflow-y-hidden">
            <div className='w-full flex gap-4'>

                <div className='flex flex-col gap-4 w-1/2'>
                    <div className='flex gap-3 w-full'>
                        <ExportToSLSXButton exportData={filteredEmployees} />
                        <SkillsPopoverSelect setPickedSkills={setPickedSkills} />
                        <PickedSKillsDisplay pickedSkills={pickedSkills} setPickedSkills={setPickedSkills} />
                    </div>
                    <EmployeeTable employeeData={filteredEmployees} />
                </div>

                {employee && selectedEmployeeData ?
                    <EmployeeCard selectedEmployeeData={selectedEmployeeData} employeeSkills={employeeSkillsData && employeeSkillsData[employee]} pickedSkillNames={pickedSkills.map((el) => el.name)} />
                    :
                    <EmployeeCardPlaceholder />
                }

            </div>

        </ScrollArea>
    )
}

export default RecruitmentPage