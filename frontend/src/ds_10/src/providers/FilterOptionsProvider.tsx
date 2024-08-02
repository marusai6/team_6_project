import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { KoobDataService } from "bi-internal/services"
import { updateDepartments, updateEmployees, updateKnowledgeCategories, updateSkillsByCategories } from '../state/filterOpitons/filterOptionsSlice'

const { koobDataRequest3 } = KoobDataService

const FilterOptionsProvider = ({ children }: { children: React.ReactNode }) => {

    const dispatch = useDispatch()

    function groupByCategory(array) {
        return array.reduce((result, item) => {
            const category = item.category_know_название;
            const knowledge = item.knows_название;

            if (!result[category]) {
                result[category] = [];
            }

            result[category].push(knowledge);

            return result;
        }, {});
    }

    const fetchCategories = async () => {
        koobDataRequest3(
            'etl_db_6.team_6',
            ['category_know_название', 'knows_название'],
            [],
            { levels_n_level: ['!=', null] },
            // @ts-ignore
            { schema_name: 'ds_10' },
            'etl_db_6.team_6',
        ).then(res => {
            const groupedData = groupByCategory(res)
            dispatch(updateKnowledgeCategories(Object.keys(groupedData)))
            dispatch(updateSkillsByCategories(groupedData))
        })
    }

    const fetchDepartments = async () => {
        koobDataRequest3(
            'etl_db_6.team_6',
            ['подразделения'],
            [],
            {},
            // @ts-ignore
            { schema_name: 'ds_10' },
            'etl_db_6.team_6',
        ).then(res => {
            dispatch(updateDepartments(res.map((el) => el.подразделения)))
        })
    }

    const fetchEmployees = async () => {
        koobDataRequest3(
            'etl_db_6.team_6',
            ['User ID'],
            [],
            {},
            // @ts-ignore
            { schema_name: 'ds_10' },
            'etl_db_6.team_6',
        ).then(res => {
            dispatch(updateEmployees(res.map((el) => String(el["User ID"]))))
        })
    }

    useEffect(() => {
        fetchCategories()
        fetchDepartments()
        fetchEmployees()
    }, [])


    return (
        <>
            {children}
        </>
    )
}

export default FilterOptionsProvider