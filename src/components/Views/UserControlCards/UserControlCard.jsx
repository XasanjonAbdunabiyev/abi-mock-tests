import {
	Avatar,
	Text,
	rem,
	Center,
	Paper,
	Group,
	Box,
	ActionIcon,
} from '@mantine/core'
import adminImage from '@/assets/images/admin.jpg'
import {
	IconBrandInstagram,
	IconBrandTelegram,
	IconBrandYoutube,
} from '@tabler/icons-react'

export function AdminInfoControl() {
	return (
		<Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
			<Avatar src={adminImage} size={120} radius={120} mx="auto" />
			<Text ta="center" fz="lg" fw={500} mt="md">
				Abbos Shodmonov
			</Text>
			<Text ta="center">
				<a
					style={{
						fontFamily: 'sans-serif',
						color: 'inherit',
					}}
					href="tel:+998 91 470 98 02"
				>
					+998 91 470 98 02
				</a>
			</Text>
			<Text ta="center" c="dimmed" fz="sm">
				abbosshodmonov@gmail.com • English Mentor
			</Text>

			<Group gap="xs" justify="center" my={10} wrap="nowrap">
				<Center>
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
				</Center>
			</Group>
		</Paper>
	)
}
