import { HeroImageRight } from '@/components/Views/HeroComponents/HomePageHero'
import { PageLoading } from '@/components/Views/Loading/PageLoadings/PageLoading'
import { useState, useEffect } from 'react'
import { Layout } from '@/components/LayoutComponents/Layout'
import { Box, Button, Center, Flex, Table, Title } from '@mantine/core'
import { Unlock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { API_COLLECTIONS } from '@/services/api/api-collection'
import { getFirestoreCollections } from '@/services/api/docs'

export default function HomeScreen() {
	const navigate = useNavigate()
	const [data, setData] = useState()

	useEffect(() => {
		const fetchPracticeQuestions = async () => {
			try {
				const res = await getFirestoreCollections(
					API_COLLECTIONS.FREE_MOCK_TESTS
				)
				setData(res)
			} catch (error) {
				console.log(error)
			}
		}
		fetchPracticeQuestions()
	}, [])

	const renderSubmissionButton = (navigatePath) => (
		<Box>
			<Button size="lg" fw="bold" onClick={() => navigate(navigatePath)}>
				Submission
			</Button>
		</Box>
	)

	console.log(data)

	const rows = data?.map((element, index) => {
		return (
			<Table.Tr variant="light" key={element?.id}>
				<Table.Td style={{ fontSize: '1.1rem' }}>
					<Box style={{ textAlign: 'center' }}>
						Multi Lavel: Mock Test {index}
					</Box>
				</Table.Td>
				<Table.Td>
					<Flex align="center" justify="center">
						<Button size="lg" p={12}>
							<Unlock fontSize={22} />
						</Button>
					</Flex>
				</Table.Td>
				<Table.Td>
					<Box
						style={{
							textAlign: 'center',
							fontWeight: 'bolder',
							textTransform: 'uppercase',
						}}
					>
						{renderSubmissionButton(
							`/mock?question-id=${element?.id}`
						)}
					</Box>
				</Table.Td>
			</Table.Tr>
		)
	})

	return (
		<Layout>
			<Box>
				<HeroImageRight />
			</Box>
			<Center my={10}>
				<Title
					style={{ textAlign: 'center', letterSpacing: 1 }}
					order={2}
					tt="uppercase"
				>
					Practise Tests
				</Title>
			</Center>
			<Box my={15}>
				<Table.ScrollContainer minWidth={800}>
					<Table
						verticalSpacing="md"
						horizontalSpacing="lg"
						withColumnBorders
						withTableBorder
						striped
					>
						<Table.Thead>
							<Table.Tr>
								<Table.Th
									tt="uppercase"
									style={{ fontSize: 16 }}
								>
									<Box style={{ textAlign: 'center' }}>
										MOCK TEST MODULES
									</Box>
								</Table.Th>
								<Table.Th
									tt="uppercase"
									style={{ fontSize: 16 }}
								>
									<Box style={{ textAlign: 'center' }}>
										PURCHASE
									</Box>
								</Table.Th>
								<Table.Th
									tt="uppercase"
									style={{ fontSize: 16 }}
								>
									<Box style={{ textAlign: 'center' }}>
										Speaking
									</Box>
								</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</Table.ScrollContainer>
			</Box>
		</Layout>
	)
}
