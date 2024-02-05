import { useState } from 'react'
import { Button, ScrollArea, Table } from '@mantine/core'
import { Pencil } from 'lucide-react'
import { API_COLLECTIONS } from '@/services/api/api-collection'
import { getFirestoreCollections } from '@/services/api/docs'
import { firestore_db } from '@/services/firebase/configs'
import { notifications } from '@mantine/notifications'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'

export function TableSelection() {
	const [_scrolled, setScrolled] = useState(false)

	const {
		data: users,
		status,
		isError,
		isLoading,
		isFetching,
	} = useQuery({
		queryFn: () => getFirestoreCollections(API_COLLECTIONS.USERS),
		queryKey: ['dashboard-users'],
	})

	const queryClient = useQueryClient()
	if (status === 'pending' && isLoading && isFetching)
		return <p>Loading...</p>
	else if (status === 'error' && isError) return <p>Error</p>

	/**
	 * The function `handleUpdateUsersIsPaid` updates the `isPaid` property of a user in a Firestore
	 * database and displays a notification.
	 */
	const handleUpdateUsersIsPaid = async (user_db) => {
		const updateUserIsPaidCollection = doc(
			firestore_db,
			API_COLLECTIONS.USERS,
			user_db?.id
		)

		try {
			const updatedUser = { ...user_db, isPaid: !user_db?.isPaid }
			await updateDoc(updateUserIsPaidCollection, updatedUser).then(
				() => {
					notifications.show({
						title: 'Update',
						message: 'Update user is paid',
						autoClose: 2000,
					})
				}
			)
			queryClient.invalidateQueries({ queryKey: ['dashboard-users'] })
		} catch (error) {
			notifications.show({
				title: 'Error updating user',
				message: 'Error updating user is paid check try again',
				autoClose: 2000,
			})
		}
	}

	const rows = users?.map((row, index) => {
		return (
			<Table.Tr key={row.appId}>
				<Table.Td style={{ fontSize: '1rem' }}>
					{index + ') ' + row.email}
				</Table.Td>
				<Table.Td style={{ fontSize: '1rem' }}>{row.password}</Table.Td>
				<Table.Td style={{ fontSize: '1rem' }}>
					{row.isPaid?.toString()}
				</Table.Td>
				<Table.Td style={{ fontSize: '1rem' }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '0.5rem',
						}}
					>
						<Button
							size="md"
							onClick={() => handleUpdateUsersIsPaid(row)}
							rightSection={<Pencil />}
							variant="default"
						>
							Update
						</Button>
					</div>
				</Table.Td>
			</Table.Tr>
		)
	})

	return (
		<ScrollArea
			h={300}
			my={80}
			onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
		>
			<Table miw={700}>
				<Table.Thead>
					<Table.Tr>
						<Table.Th
							tt="uppercase"
							color="#228BE6"
							style={{ fontSize: '1rem' }}
						>
							Email
						</Table.Th>
						<Table.Th tt="uppercase" style={{ fontSize: '1rem' }}>
							Password
						</Table.Th>
						<Table.Th tt="uppercase" style={{ fontSize: '1rem' }}>
							Is Paid
						</Table.Th>
						<Table.Th tt="uppercase" style={{ fontSize: '1rem' }}>
							Crud Operation
						</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
		</ScrollArea>
	)
}
