import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'

const EmployeeCardPlaceholder = () => {
    return (
        <Card className='h-full w-1/2'>
            <CardHeader>
                <CardTitle>Карточка сотрудника</CardTitle>
            </CardHeader>
            <CardContent>
                Выберите интересующего сотрудника нажатием по строке в таблице
            </CardContent>
        </Card>
    )
}

export default EmployeeCardPlaceholder