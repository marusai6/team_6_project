import { useEffect, useState } from "react"
import useFetch from "./useFetch"
import { useFilters } from "./useFilters"
import { useSelector } from "react-redux"
import { RootState } from "../state/store"

type EmployeeGeneralSkills = {
    category_know_название: string
    knows_название: string
    levels_название: string
}

type groupedEmployeeSkills = {
    [key: string]: { skill: string, level: string }[]
}


const groupByCategory = (generalSkills: EmployeeGeneralSkills[]) => {
    if (!generalSkills) return []
    return generalSkills.reduce((acc, curr) => {
        if (!acc[curr.category_know_название]) {
            acc[curr.category_know_название] = []
        }
        acc[curr.category_know_название].push({ skill: [curr.knows_название], level: curr.levels_название })
        return acc
    }, {})
}

export const useEmployeeGeneralSkills = () => {

    const { employeeFilter, generalSkillsFilter, yearPeriodsFilter } = useFilters()

    const { employee } = useSelector((state: RootState) => state.filters)

    const { data: employeeGeneralSkillsData, loading: loadingEmployeeGeneralSkillsData } = useFetch<EmployeeGeneralSkills>({ dimensions: ['category_know_название'], measures: ['knows_название', 'levels_название'], filters: { ...employeeFilter, ...generalSkillsFilter, ...yearPeriodsFilter }, filtersAreReady: !!employee, queryKey: 'EmployeeContactData' })

    const [groupedGeneralSkillData, setGroupedGeneralSkillData] = useState<groupedEmployeeSkills>({})

    useEffect(() => {
        if (!loadingEmployeeGeneralSkillsData) {
            setGroupedGeneralSkillData(groupByCategory(employeeGeneralSkillsData))
        }
    }, [employeeGeneralSkillsData])


    return { groupedGeneralSkillData }
}