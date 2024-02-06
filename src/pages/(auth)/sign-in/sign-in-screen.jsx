import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { API_COLLECTIONS } from '@/services/api/api-collection'
import {
	addUsersToUsersDatabase,
	getFirestoreCollections,
} from '@/services/api/docs'
import { useForm } from 'react-hook-form'
import {
	Paper,
	PasswordInput,
	TextInput,
	Title,
	Button,
	Text,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { ROUTER_ACTIONS } from '@/services/providers/Router/RouterActions'
import classes from './style.module.scss'

export default function SignInScreen() {
	const [admin, setAdmin] = useState({ email: '', password: '' })
	const [loadingState, setLoadingState] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const navigate = useNavigate()

	useEffect(() => {
		const controller = new AbortController()
		let isApiSubscribed = true
		const fetchAdminData = async () => {
			try {
				const _ = await getFirestoreCollections(
					API_COLLECTIONS.LOGIN
				).then(function (adminUser) {
					setAdmin(adminUser)
				})
			} catch (error) {
				if (error.name === 'AbortError') {
					notifications.show('Request Successfully aborted')
				}
			}
		}
		fetchAdminData()
		return () => {
			isApiSubscribed = false
			controller.abort()
		}
	}, [])

	const onSubmit = async (data) => {
		let adminEmail = admin?.[0]?.email
		let adminPassword = admin?.[0]?.password

		if (adminEmail === data?.email && adminPassword === data?.password) {
			navigate(ROUTER_ACTIONS.DASHBOARD)
			localStorage.setItem('token', `${uuid()}`)
			notifications.show({
				title: 'Welcome to Dashboard',
				message: 'Your are admin',
			})
		} else {
			await addUsersToUsersDatabase(data?.email, data?.password)
				.then(() => {
					setLoadingState(true)
					navigate(ROUTER_ACTIONS.HOME)
					notifications.show({
						title: 'Account Created',
						message: 'Your account has been created',
						autoClose: 3000,
					})
				})
				.catch(() => {
					notifications.show({
						title: 'Something went wrong',
						autoClose: 2000,
					})
				})
		}
	}

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
					<Title
						order={2}
						className={classes.title}
						ta="center"
						mt="md"
						mb={50}
					>
						Welcome
						<Title
							component="a"
							display="block"
							href="/"
							style={{ color: 'inherit', fontWeight: '900' }}
							order={3}
							tt="uppercase"
						>
							Mock Tests
						</Title>
					</Title>

					<TextInput
						label="Username"
						placeholder="someone"
						size="md"
						{...register('username', {
							min: 5,
							max: 10,
						})}
					/>
					{errors.username && (
						<Text color="red" fw="bold">
							Username is a reqired field
						</Text>
					)}
					<TextInput
						label="Email address"
						placeholder="hello@gmail.com"
						size="md"
						{...register('email', {
							required: true,
							min: 7,
							max: 10,
						})}
					/>
					{errors.email && (
						<Text color="red" fw="bold">
							Email Address is a reqired field
						</Text>
					)}

					<PasswordInput
						label="Password"
						placeholder="Your password"
						mt="md"
						size="md"
						{...register('password', { required: true })}
					/>
					{errors.password && (
						<Text color="red" fw="bold">
							Password is a reqired field
						</Text>
					)}

					<Button
						fullWidth
						mt="xl"
						loaderProps={{ type: 'bars' }}
						disabled={loadingState}
						loading={loadingState}
						variant="filled"
						type="submit"
						size="md"
					>
						Sign In
					</Button>
				</form>
			</Paper>
		</div>
	)
}
