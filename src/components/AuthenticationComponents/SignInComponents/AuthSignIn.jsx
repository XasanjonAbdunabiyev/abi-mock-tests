import { zodResolver } from 'mantine-form-zod-resolver'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

const schema = z.object({
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string().min(8, {
		message: 'You must be at least 8 to create an account',
	}),
})

import { useGetData } from '@/hooks/useGetData'
import { API_COLLECTIONS } from '@/services/api/api-collection'
import {
	addUsersToUsersDatabase,
	getFirestoreCollections,
} from '@/services/api/docs'
import {
	Anchor,
	Button,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import classes from './style.module.scss'

export function SignInWithImage() {
	/* The code `const form = useForm({ initialValues: { email: '', password: '', }, validate:
	zodResolver(schema), });` is creating a form object using the `useForm` hook from the
	`@mantine/form` library. */
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},
		validate: zodResolver(schema),
	})

	const navigate = useNavigate()
	const { signIn } = useCurrentUser()

	const { data, isFetching, status, isError, isLoading } = useGetData(
		['admin-user'],
		() => getFirestoreCollections(API_COLLECTIONS.LOGIN)
	)

	if (status === 'pending' && isLoading && isFetching) {
		return <p>Loading...</p>
	} else if (status === 'error' && isError) {
		return <p>Error</p>
	}

	/**
	 * The `handleSubmit` function checks if the provided email and password match the stored values, and
	 * performs different actions based on the result.
	 */

	const handleSubmit = async (values) => {
		const signUpUser = localStorage.getItem('SIGNUP_USER')
		const x = JSON.parse(signUpUser)
		if (
			values?.email === data[0]?.email &&
			values?.password === data[0]?.password
		) {
			navigate('/dashboard')
			notifications.show({
				title: 'Logged in',
				message: 'Welcome to your Dashboard',
				autoClose: 3000,
			})
			localStorage.setItem('token', `${uuid()}`)
		} else if (
			values?.email === x?.email &&
			values?.password === x?.password
		) {
			await addUsersToUsersDatabase(values?.email, values?.password).then(
				() => {
					signIn(values?.email, values?.password)
						.then(() => {
							navigate('/')
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
			)
		} else {
			notifications.show({
				title: 'Incorrect email or password',
				message: 'Try Again',
				autoClose: 2000,
			})
		}
	}

	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<form
					onSubmit={form.onSubmit((values) => handleSubmit(values))}
				>
					<Title
						order={2}
						className={classes.title}
						ta="center"
						mt="md"
						mb={50}
					>
						Welcome{' '}
						<Title
							component="a"
							display="block"
							href="/"
							style={{ color: 'inherit' }}
							order={3}
							tt="uppercase"
						>
							MultiLevel
						</Title>
					</Title>

					<TextInput
						label="Email address"
						placeholder="hello@gmail.com"
						size="md"
						{...form.getInputProps('email')}
					/>

					<PasswordInput
						label="Password"
						placeholder="Your password"
						mt="md"
						size="md"
						{...form.getInputProps('password')}
					/>

					<Button fullWidth mt="xl" type="submit" size="md">
						Login
					</Button>
				</form>
				<Text ta="center" mt="md">
					Don&apos;t have an account?
					<Anchor href="/sign-up" fw={700}>
						Sign Up
					</Anchor>
				</Text>
			</Paper>
		</div>
	)
}
