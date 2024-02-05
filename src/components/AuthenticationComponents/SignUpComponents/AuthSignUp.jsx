import {
	Button,
	Container,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
	rem,
} from '@mantine/core'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import { zodResolver } from 'mantine-form-zod-resolver'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z.object({
	username: z.string().min(5, {
		message: 'You must be at least 5 to create an account',
	}),
	email: z.string().email({ message: 'Invalid email' }),
	password: z.string().min(8, {
		message: 'You must be at least 8 to create an account',
	}),
})

export function AuthSignUp() {
	const form = useForm({
		initialValues: {
			username: '',
			email: '',
			password: '',
		},

		validate: zodResolver(schema),
	})
	const navigate = useNavigate()

	/* The `const { signUp } = useCurrentUser()` line is using the `useCurrentUser` hook to get the
	`signUp` function. This function is used to sign up a user with the provided email and password. */
	const { signUp } = useCurrentUser()

	function handleSubmit(values) {
		signUp(values?.email, values?.password)
			.then(() => {
				const id = notifications.show({
					loading: true,
					title: 'Loading your data',
					message:
						'Data will be loaded in 2 seconds, you cannot close this yet',
					autoClose: false,
					withCloseButton: false,
				})

				localStorage.setItem(
					'SIGNUP_USER',
					JSON.stringify({
						email: values?.email,
						password: values?.password,
						username: values?.username,
					})
				)

				setTimeout(() => {
					notifications.update({
						id,
						color: 'teal',
						title: 'Data was loaded',
						message:
							'Notification will close in 2 seconds, you can close this notification now',
						icon: (
							<IconCheck
								style={{ width: rem(18), height: rem(18) }}
							/>
						),
						loading: false,
						autoClose: 1000,
					})
					navigate('/sign-in')
				}, 2000)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<Container size={420} my={40}>
			<Title ta="center" order={3}>
				Create An Account
			</Title>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form
					onSubmit={form.onSubmit((values) => handleSubmit(values))}
				>
					<TextInput
						label="User Name"
						placeholder="someone name"
						{...form.getInputProps('username')}
						fw="bold"
					/>

					<TextInput
						label="Email"
						placeholder="you@mantine.dev"
						{...form.getInputProps('email')}
						fw="bold"
					/>
					<PasswordInput
						label="Password"
						placeholder="your password"
						mt="md"
						{...form.getInputProps('password')}
					/>
					<Text fw="bold" my={5}>
						Already have account
						<Link style={{ marginLeft: 10 }} to="/sign-in">
							Sign In
						</Link>
					</Text>
					<Button type="submit" fullWidth mt="xl">
						Sign Up
					</Button>
				</form>
			</Paper>
		</Container>
	)
}
