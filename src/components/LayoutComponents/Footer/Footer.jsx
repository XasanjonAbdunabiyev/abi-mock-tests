import React from 'react'

import { Group, ActionIcon, rem, Box, Anchor, Title } from '@mantine/core'
import {
	IconBrandTelegram,
	IconBrandYoutube,
	IconBrandInstagram,
} from '@tabler/icons-react'

import classes from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { ROUTER_ACTIONS } from '@/services/providers/Router/RouterActions'

const links = [
	{ link: '+998 91 470 98 02', label: 'For reference' },
	{ link: '#', label: 'Privacy' },
	{ link: '#', label: 'Blog' },
	{ link: '#', label: 'Store' },
	{ link: '#', label: 'Careers' },
]

export function Footer() {
	const navigate = useNavigate()
	const items = links.map((link) => (
		<Anchor
			c="dimmed"
			key={link.label}
			href={link.link}
			lh={1}
			fw="bold"
			size="md"
		>
			{link.label}
		</Anchor>
	))
	return (
		<div className={classes.footer}>
			<div className={classes.inner}>
				<Title
					order={3}
					fw="900"
					tt="uppercase"
					style={{ cursor: 'pointer' }}
					onClick={() => navigate(`${ROUTER_ACTIONS.HOME}`)}
				>
					Multi Level
				</Title>

				<Group
					className={classes.links}
					style={{ textAlign: 'center' }}
				>
					<a
						className={classes.link}
						style={{ fontFamily: 'sans-serif', color: 'inherit' }}
						href="tel:+998 91 470 98 02"
					>
						For Reference +998 91 470 98 02
					</a>
					<a
						className={classes.link}
						style={{ fontFamily: 'sans-serif', color: 'inherit' }}
						href="tel:+998 91 470 98 02"
					>
						Created By Abbos Shodmonov
					</a>
				</Group>

				<Group gap="xs" justify="flex-end" wrap="nowrap">
					<Box>
						<ActionIcon
							component="a"
							href="https://t.me/abi_blog"
							size="xl"
							target="_blank"
							mx={4}
							radius="lg"
						>
							<IconBrandTelegram
								style={{ width: rem(27), height: rem(27) }}
								stroke={2}
							/>
						</ActionIcon>
						<ActionIcon
							size="xl"
							component="a"
							target="_blank"
							href="https://www.youtube.com/@MonsterEnglish"
							radius="lg"
							mx={4}
						>
							<IconBrandYoutube
								style={{ width: rem(27), height: rem(27) }}
								stroke={2}
							/>
						</ActionIcon>
						<ActionIcon
							size="xl"
							component="a"
							href="https://www.instagram.com/monster_ielts?igsh=NmlubmlqY25ncnZv"
							target="_blank"
							radius="lg"
							mx={4}
						>
							<IconBrandInstagram
								style={{ width: rem(27), height: rem(27) }}
								stroke={2}
							/>
						</ActionIcon>
					</Box>
				</Group>
			</div>
		</div>
	)
}
