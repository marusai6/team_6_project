import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { DonutChart, Legend } from '@tremor/react';
import { defaultDataFormatter, getCurrentPeriod } from '../../lib/utils';
import ExportToPNGButton from '../exportButtons/ExportToPNGButton';
import useFetch from '../../hooks/useFetch';
import { urlState, UrlState } from 'bi-internal/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const DonutDashlet = () => {

    const ref = useRef()

    const { year, halfyear } = useSelector((state: RootState) => state.filters)
    const periodFilter = { 'period_название': ['=', halfyear === '1' ? `1п - ${year}` : `2п -${year}`] }

    const { data: levelsData, loading: loadingLevelsData, fetchData: fetchLevelsData } = useFetch<{ lables_название: string, lables_id: number }>({ dimensions: ['lables_название'], measures: ['lables_название', 'count(lables_id)'], filters: { lables_n_level: ['!=', null], ...periodFilter } })
    const finalLevelsData = levelsData.map((level) => ({ level: level.lables_название, count: level.lables_id }))

    useEffect(() => {
        fetchLevelsData()
    }, [year, halfyear])


    return (
        <Card className='h-full flex flex-col'>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Уровни навыков</CardTitle>
                    <CardDescription>круговая диаграмма</CardDescription>
                </div>
                <ExportToPNGButton exportRef={ref} />
            </CardHeader>
            <CardContent ref={ref} className='flex flex-col justify-center items-center gap-2 flex-1'>
                <DonutChart
                    data={finalLevelsData}
                    category="count"
                    index="level"
                    valueFormatter={defaultDataFormatter}
                    className="w-60 h-60 text-3xl"
                    showLabel={false}
                    showAnimation={true}
                    noDataText='Нет данных'
                />
                <Legend
                    categories={finalLevelsData.map((el) => el.level)}
                    className="max-w-xs"
                />

            </CardContent>
        </Card>
    )
}

export default DonutDashlet