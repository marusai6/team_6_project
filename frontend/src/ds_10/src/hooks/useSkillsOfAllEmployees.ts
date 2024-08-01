import { useEffect, useMemo, useState } from "react"
import { useFilters } from "./useFilters"
import useFetch from "./useFetch"
import { Skills } from "../components/dashboards/RecruitmentPage"

type EmployeeRowData = {
    'User ID': number
    knows_название: string
    levels_n_level: number
}

type GroupedEmployeeSkillData = {
    [key: string]: Skills
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


export const useSkillsOfAllEmployees = () => {
    const { leveledSkillsFilter, currentLevelFilter, yearPeriodsFilter } = useFilters()

    const { data: allEmployeesRawData, loading: loadingAllEmployeesRawData } = useFetch<{ 'User ID': number, levels_n_level: number, knows_название: string, period_название: string }>({ dimensions: ['User ID'], measures: ['levels_n_level', 'knows_название', 'period_название'], filters: { ...leveledSkillsFilter, ...currentLevelFilter, ...yearPeriodsFilter }, queryKey: 'AllCurrentEmployeeSkillsData' })

    const employeeSkillsData = useMemo(() => {
        if (allEmployeesRawData) {
            return groupByUserId(allEmployeesRawData)
        }
        return {}
    }, [allEmployeesRawData])

    return { employeeSkillsData }

}
