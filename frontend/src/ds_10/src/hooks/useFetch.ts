import { KoobDataService } from "bi-internal/services"
import { useState } from "react"

const { koobDataRequest3 } = KoobDataService

export default function useFetch<DataType>({ dimensions = [], measures = [], filters = {} }: {
    dimensions: string[],
    measures: string[],
    filters: object
}) {

    const [data, setData] = useState<DataType[]>([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        setLoading(true)
        koobDataRequest3(
            'course_2024.Student6',
            dimensions,
            measures,
            filters,
            // @ts-ignore
            { schema_name: 'ds_10' },
            'course_2024.Student6'
        ).then(res => {
            setData(res)
            setLoading(false)
        })
    }

    return { data, loading, fetchData }
}
