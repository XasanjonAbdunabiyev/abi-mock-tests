import { useQuery } from '@tanstack/react-query'

export const useGetData = (keys, queryFn, ...options) => {
	const { data, isLoading, isError, ...rest } = useQuery({
		queryKey: keys,
		queryFn: queryFn,
		...options,
	})

	return { data, isLoading, isError, ...rest }
}
