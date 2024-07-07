import { DonutChart, Legend } from '@tremor/react'
import React from 'react'

type DataType = {
    name: string
    value: number
}

const DonutChartComponent = ({ data, dataFormatter }: { data: DataType[], dataFormatter: (number: number) => string }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <DonutChart
                data={data}
                category="value"
                index="name"
                valueFormatter={dataFormatter}
                // colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'teal', 'amber', 'rose']}
                className="w-40 z-10"
            />
            <Legend
                categories={data.map((el) => el.name)}
                // colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia', 'teal', 'amber', 'rose']}
                className="max-w-xs"
            />
        </div >
    )
}

export default DonutChartComponent