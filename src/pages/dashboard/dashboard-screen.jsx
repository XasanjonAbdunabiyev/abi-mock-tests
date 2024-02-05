import { TableSelection } from '@/components/DashboardComponents/DashboardTable'
import { Layout } from '@/components/LayoutComponents/Layout'
import { Drobzone } from '@/components/Views/Drobzone'
import { Box, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { IconArrowBack } from '@tabler/icons-react'

export default function DashboardScreen() {
	const navigate = useNavigate()
	return (
		<Layout>
			<Button
				size="md"
				onClick={() => navigate('/')}
				leftSection={<IconArrowBack />}
			>
				Back To Home
			</Button>
			<Box
				my={6}
				style={{ borderTop: '2px solid #228BE6', paddingTop: '20px' }}
			>
				<TableSelection />
			</Box>
			<Box mt={10}>
				<Drobzone />
			</Box>
		</Layout>
	)
}
