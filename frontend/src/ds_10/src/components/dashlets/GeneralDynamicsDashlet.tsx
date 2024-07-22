import React, { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import Badge from '../ui/Badge'
import ExportToPNGButton from '../exportButtons/ExportToPNGButton'
import { UrlState } from 'bi-internal/core'
import { getNoun } from '../../lib/utils'

const GeneralDynamicsDashlet = () => {

    const ref = useRef()

    const year = UrlState.getModel().year

    return (
        <Card ref={ref} className='h-full'>
            <CardHeader className='flex flex-col items-center'>
                <CardTitle className='flex justify-between w-full'>
                    Общая динамика
                    <ExportToPNGButton exportRef={ref} />
                </CardTitle>
                <CardDescription className='flex justify-between w-full pt-1'>
                    <p>{`Прирост за ${year}`}</p>
                    <p>{`отношение к ${year - 1}`}</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center justify-between'>
                    <div className='flex items-end gap-2'>
                        <h2 className='text-3xl font-semibold'>118</h2>
                        <span className='text-xl font-medium'>{getNoun(118, 'грейд', 'грейда', 'грейдов')}</span>
                    </div>
                    <Badge number={5.97} />
                </div>
            </CardContent>
        </Card>
    )
}

export default GeneralDynamicsDashlet