import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'

const FilterOptionsProvider = ({ children }: { children: React.ReactNode }) => {

    const { data: levelsData, loading: loadingLevelsData, fetchData: fetchLevelsData } = useFetch<{ lables_название: string, lables_id: number }>({ dimensions: ['category_know_название'], measures: [], filters: { lables_n_level: ['!=', null] } })

    useEffect(() => {
        fetchLevelsData()
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default FilterOptionsProvider