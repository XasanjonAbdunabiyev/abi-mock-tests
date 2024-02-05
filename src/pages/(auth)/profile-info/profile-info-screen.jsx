import { Layout } from '@/components/LayoutComponents/Layout'
import { Box, Button, Center, Paper, Text } from '@mantine/core'
import Lottie from 'lottie-react'
import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurretUser } from '@/services/api/docs'
import lottie_user from '@/assets/jsons/user.json'

import { deleteUsersFromUsersDatabase } from '@/services/api/docs'
import { notifications } from '@mantine/notifications'
import classes from './style.module.scss'

function UserInfoIcons() {
	const navigate = useNavigate()
	const [userData, setUserData] = useState({})
	useEffect(() => {
		let isApiSubscribed = true
		const controller = new AbortController()
		const fetchUserData = async () => {
			try {
				let userId = localStorage.getItem('user-collection-id')
				if (userId) {
					await getCurretUser(userId).then((user) => {
						setUserData(user)
					})
				} else {
					setUserData(null)
				}
			} catch (error) {
				if (error.name === 'AbortError') {
					notifications.show('Request Successfully aborted')
				}
			}
		}
		fetchUserData()
		return () => {
			isApiSubscribed = false
			controller.abort()
		}
	}, [])

	useEffect(() => {
		if (!userData) {
			navigate('/sign-in')
		}
	}, [userData])

	/**
	 * The function `handleLogOut` logs out the current user, deletes the user from the database, removes
	 * user-related data from local storage, and navigates to the sign-in page.
	 */
	const handleLogOut = async function () {
		const currentUserId = localStorage.getItem('user-collection-id')
		await deleteUsersFromUsersDatabase(currentUserId)
			.then(() => {
				localStorage.removeItem('user-collection-id')
				navigate('/sign-in')
				notifications.show({
					title: 'Success',
					message: 'Account deleted successfully',
					autoClose: 1600,
				})
			})
			.catch(() => {
				notifications.show({
					title: 'Error',
					message: 'Something went wrong with your account',
					autoClose: 2500,
				})
			})
	}

	return (
		<Box className={classes.container}>
			<Box className={classes.lottieUser}>
				<Lottie animationData={lottie_user} />
			</Box>
			<Paper
				className={classes.profileContent}
				h="max-content"
				p="lg"
				radius="md"
				withBorder
				bg="var(--mantine-color-body)"
			>
				<Text ta="center" fz="lg" fw={500} mt="md">
					{userData?.email}
				</Text>
				<Text ta="center" c="dimmed" fz="sm">
					{userData?.password}
				</Text>
				<Center>
					<Button
						bg="red"
						color="white"
						onClick={handleLogOut}
						rightSection={<LogOut />}
						mx={10}
						mt="md"
						size="md"
					>
						Log Out
					</Button>
				</Center>
			</Paper>
		</Box>
	)
}

export default function ProfileInfoScreen() {
	return (
		<Layout>
			<UserInfoIcons />
		</Layout>
	)
}
