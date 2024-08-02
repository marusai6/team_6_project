import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCategory, changeDepartment, changeEmployee, changePeriod, changeSkill } from '../state/filters/filtersSlice'
import { UrlState } from 'bi-internal/core'
import { RootState } from '../state/store'

const FiltersGlobalStateProvider = ({ children }: { children: React.ReactNode }) => {

    const { year, halfyear, category, skill, department, employee } = useSelector((state: RootState) => state.filters)

    const dispatch = useDispatch()

    const callback = useCallback((model) => {
        if (year != model.year || halfyear != model.halfyear) {
            dispatch(changePeriod({ year: model.year, halfyear: model.halfyear }))
        }
        if (category != model.knowledgeField) {
            dispatch(changeCategory(model.knowledgeField))
        }
        if (skill != model.skill) {
            dispatch(changeSkill(model.skill))
        }
        if (department != model.department) {
            dispatch(changeDepartment(model.department))
        }
        if (employee != model.employee) {
            dispatch(changeEmployee(model.employee))
        }
    }, [year, halfyear, category, skill, department, employee])

    useEffect((): (() => void) => {
        UrlState.subscribeUpdatesAndNotify(callback)
        return () => UrlState.unsubscribe(callback)
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default FiltersGlobalStateProvider