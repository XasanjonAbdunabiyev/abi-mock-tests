import {
	Group,
	Button,
	Divider,
	Box,
	Burger,
	Drawer,
	ScrollArea,
	rem,
	Title,
	Container,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { ThemeSwitch } from '../ThemeSwitch'
import { ROUTER_ACTIONS } from '@/services/providers/Router/RouterActions'
import { useState, useEffect } from 'react'
import { getCurretUser } from '@/services/api/docs'

export function HeaderMegaMenu() {
	const [userData, setUserData] = useState([])
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false)

	const navigate = useNavigate()

	useEffect(() => {
		let isApiSubscribed = true
		const controller = new AbortController()
		const fetchUserData = async () => {
			try {
				let userId = localStorage.getItem('user-collection-id')
				if (userId) {
					await getCurretUser(userId).then((user) => {
						console.log(user)
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

	return (
		<Box pb={20}>
			<Container size="xl">
				<header className={classes.header}>
					<Group justify="space-between" h="100%">
						<Title
							order={3}
							fw="900"
							tt="uppercase"
							style={{ cursor: 'pointer', fontWeight: "bold" }}
							onClick={() => navigate(`${ROUTER_ACTIONS.HOME}`)}
						>
							Multi Level
						</Title>

						<Group h="100%" gap={0} visibleFrom="md">
							<a
								href={ROUTER_ACTIONS.HOME}
								className={classes.link}
							>
								Home
							</a>
							<a
								href={ROUTER_ACTIONS.PURCHASE_MOCK}
								className={classes.link}
							>
								Purchase Tests
							</a>
							<a
								href={ROUTER_ACTIONS.DASHBOARD}
								className={classes.link}
							>
								Dashboard
							</a>
							<a
								href={ROUTER_ACTIONS.PROFILE_INFO}
								className={classes.link}
							>
								Profile Info
							</a>
						</Group>

						<Group visibleFrom="md">
							{!userData ? (
								<Button
									variant="default"
									onClick={() =>
										navigate(`${ROUTER_ACTIONS.SIGN_IN}`)
									}
								>
									Sign In
								</Button>
							) : null}
							<ThemeSwitch />
						</Group>
						<Burger
							opened={drawerOpened}
							onClick={toggleDrawer}
							hiddenFrom="md"
						/>
					</Group>
				</header>

				<Drawer
					opened={drawerOpened}
					onClose={closeDrawer}
					size="100%"
					padding="md"
					title="Navigation"
					hiddenFrom="md"
					style={{ fontSize: 30 }}
					zIndex={1000000}
				>
					<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
						<Divider my="md" />

						<a href={ROUTER_ACTIONS.HOME} className={classes.link}>
							Home
						</a>

						<a
							href={ROUTER_ACTIONS.PURCHASE_MOCK}
							className={classes.link}
						>
							Purchase Tests
						</a>
						<a
							href={ROUTER_ACTIONS.DASHBOARD}
							className={classes.link}
						>
							Dashboard
						</a>
						<a
							href={ROUTER_ACTIONS.PROFILE_INFO}
							className={classes.link}
						>
							Profile Info
						</a>

						<Divider my="sm" />

						<Group justify="center" grow pb="md" px="md">
							{!userData ? (
								<Button
									size="lg"
									fullWidth
									onClick={() =>
										navigate(`${ROUTER_ACTIONS.SIGN_IN}`)
									}
								>
									Sign In
								</Button>
							) : null}
							<ThemeSwitch />
						</Group>
					</ScrollArea>
				</Drawer>
			</Container>
		</Box>
	)
}
