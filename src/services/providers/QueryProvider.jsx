import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import propTypes from 'prop-types'

const queryClient = new QueryClient()

export function QueryProvider(props) {
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	)
}

QueryProvider.propTypes = {
	children: propTypes.node,
}
