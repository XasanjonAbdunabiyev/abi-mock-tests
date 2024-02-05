import { Helmet } from 'react-helmet'
import PageRouterProvider from './services/providers/Router/Routes'
import { ToastContainer } from '@/components/Views/Notifications/ToastContainer.jsx'
import { Box } from '@mantine/core'

export default function App() {
	return (
		<Box>
			<ToastContainer />
			<Helmet>
				<title>
					{'multilevel-mock-tests'.concat(':)').toUpperCase()}
				</title>
				<meta charSet="utf-8" />
				<link
					rel="canonical"
					href="https://mock-english-tests.netlify.app"
				/>
				<link rel="icon" href="/favicon.png" />
				<meta
					name="description"
					content="On mock-english-tests.netlify.app you will find lots of free English exam practice materials to help you"
				/>
			</Helmet>
			<PageRouterProvider />
		</Box>
	)
}
