import { useSelector } from "react-redux"
import { RootState } from "../state/store"

export const useFilters = () => {
    const { year, halfyear, department, category, skill, employee } = useSelector((state: RootState) => state.filters)

    const currentPeriodWithHalfYear = `${halfyear}п - ${year}`
    const previousPeriodWithHalfYear = halfyear === '1' ? `2п - ${+year - 1}` : `1п - ${year}`

    const currentPeriod = halfyear === 'both' ? year : currentPeriodWithHalfYear
    const previousPeriod = halfyear === 'both' ? String(+year - 1) : previousPeriodWithHalfYear

    const currentPeriodFilter = { 'period_название': ['=', currentPeriod] }
    const previousPeriodFilter = { 'period_название': ['=', previousPeriod] }

    const departmentFilter = department ? { 'подразделения': ['=', department] } : null
    const categoryFilter = category ? { 'category_know_название': ['=', category] } : null
    const skillFilter = skill ? { 'knows_название': ['=', skill] } : null
    const employeeFilter = employee ? { 'User ID': ['=', employee] } : null

    const currentLevelFilter = { 'current_level': ['=', 'true'] }
    const isHiredFilter = { 'is_hired_in_period': ['=', 'true'] }
    const isNotHiredFilter = { 'is_hired_in_period': ['=', 'false'] }
    const leveledSkillsFilter = { 'levels_n_level': ['!=', null] }

    return { leveledSkillsFilter, currentPeriodFilter, previousPeriodFilter, departmentFilter, categoryFilter, currentPeriod, previousPeriod, skillFilter, employeeFilter, isHiredFilter, isNotHiredFilter, currentLevelFilter }
}
