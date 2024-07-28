import { useQuery } from '@tanstack/react-query';
import { KoobDataService } from 'bi-internal/services';

const { koobDataRequest3 } = KoobDataService;

export default function useFetch<DataType>({
    dimensions = [],
    measures = [],
    filters = {},
    filtersAreReady = false,
    queryKey = 'FetchData',
}: {
    dimensions: string[];
    measures: string[];
    filters: object;
    filtersAreReady?: boolean;
    queryKey?: string,
}) {

    const fetchData = async () => {
        const response = await koobDataRequest3(
            'etl_db_6.team_6',
            dimensions,
            measures,
            filters,
            // @ts-ignore
            { schema_name: 'ds_10' },
            'etl_db_6.team_6'
        );
        return response;
    };

    const { data, isLoading: loading } = useQuery<DataType[], Error>({
        queryKey: [queryKey, filters],
        queryFn: () => fetchData(),
        enabled: filtersAreReady,
        staleTime: Infinity,
    });

    return { data, loading };
}
