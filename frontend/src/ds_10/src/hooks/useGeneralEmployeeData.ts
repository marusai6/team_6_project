import { useEffect, useState } from "react"
import { GeneralEmployeeType } from "../components/dashboards/RecruitmentPage"
import useFetch from "./useFetch"
import { faker } from "@faker-js/faker/locale/ru"
import { useFilters } from "./useFilters"

export const useGeneralEmployeeData = () => {

    const { leveledSkillsFilter } = useFilters()
    const { data: generalEmployeeData, loading: loadingGeneralEmployeeData } = useFetch<{ 'User ID': number, подразделения: string, должность: string, сотрудники_дар_активность: boolean }>({ dimensions: ['User ID', 'подразделения', 'должность', 'сотрудники_дар_активность'], measures: [], filters: { ...leveledSkillsFilter }, queryKey: 'GeneralEmployeeTableData' })
    const [generalEmployee, setGeneralEmployee] = useState<GeneralEmployeeType[]>([])

    useEffect(() => {
        if (!loadingGeneralEmployeeData) {
            console.log('update general employee')
            setGeneralEmployee(generalEmployeeData.map((employee) => {
                return ({
                    id: employee['User ID'],
                    name: faker.person.firstName(),
                    email: faker.internet.email(),
                    title: employee.должность,
                    department: employee.подразделения,
                    city: faker.location.city(),
                    isFired: !employee.сотрудники_дар_активность
                })
            }))
        }
    }, [generalEmployeeData])

    return { generalEmployee }
}
