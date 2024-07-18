import React, { useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import Badge from '../ui/Badge'
import ExportToPNGButton from '../ExportToPNGButton'

const DynamicsByDepartmentDashlet = () => {

    const ref = useRef()

    return (
        <Card>
            <CardHeader className='flex flex-row justify-between items-center'>
                <div>
                    <CardTitle>Динамика развития</CardTitle>
                    <CardDescription>по подразделению</CardDescription>
                </div>
                <ExportToPNGButton exportRef={ref} />
            </CardHeader>
            <CardContent ref={ref}>
                <div className='flex items-center justify-between'>
                    <h2 className='text-3xl font-semibold'>118</h2>
                    <Badge number={5.97} />
                </div>
                <p className='text-muted-foreground'>Micorosoft BI</p>
            </CardContent>
        </Card>
    )
}

export default DynamicsByDepartmentDashlet