import PropTypes from 'prop-types'
import { Box, Button, Flex, Table } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { LockIcon } from 'lucide-react'

export function PurchaseMockTable(props) {
	const questions = props?.questions
	let currentUserIsPaid = props?.userIsPaid
	let navigate = useNavigate()

	const renderSubmissionButton = (navigatePath) => (
		<Box>
			<Button
				disabled={!currentUserIsPaid}
				size="lg"
				fw="bold"
				onClick={() => navigate(navigatePath)}
			>
				Submission
			</Button>
		</Box>
	)

	const rows = questions?.map((element, index) => {
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
							<LockIcon fontSize={22} />
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
							`/purchase-mock-speaking?question-id=${element?.id}`
						)}
					</Box>
				</Table.Td>
			</Table.Tr>
		)
	})

	return (
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
							<Table.Th tt="uppercase" style={{ fontSize: 16 }}>
								<Box style={{ textAlign: 'center' }}>
									MOCK TEST MODULES
								</Box>
							</Table.Th>
							<Table.Th tt="uppercase" style={{ fontSize: 16 }}>
								<Box style={{ textAlign: 'center' }}>
									PURCHASE
								</Box>
							</Table.Th>
							<Table.Th tt="uppercase" style={{ fontSize: 16 }}>
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
	)
}

PurchaseMockTable.propTypes = {
	questions: PropTypes.arrayOf(
		PropTypes.shape({
			question_title: PropTypes.string,
			timeThink: PropTypes.number,
			timeAnswer: PropTypes.number,
			questionAudio: PropTypes.string,
		})
	),
	userIsPaid: PropTypes.bool,
}
