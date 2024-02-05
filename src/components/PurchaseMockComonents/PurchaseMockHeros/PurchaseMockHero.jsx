import { Button, Title, Modal, Text, Image, Box } from '@mantine/core'
import { AdminInfoControl } from '@/components/Views/UserControlCards/UserControlCard'

import { useDisclosure } from '@mantine/hooks'
import classes from './style.module.scss'
import image_src from '@/assets/svgs/purchase-mock-banner.svg'

export function PurchaseMockBanner() {
	const [opened, { open, close }] = useDisclosure(false)
	return (
		<Box>
			<div className={classes.wrapper}>
				<div className={classes.body}>
					<Title order={2} className={classes.title}>
						What should I do next?
					</Title>
					<Text fw={600} fz="lg" mb={5}>
						Purchase a test
					</Text>
					<Text fz="md" c="dimmed">
						Apply to purchase test questions
					</Text>

					<div className={classes.controls}>
						<Button
							onClick={open}
							radius="md"
							className={classes.control}
						>
							For References
						</Button>
					</div>
				</div>
				<Image src={image_src} className={classes.image} />
			</div>

			<Modal opened={opened} onClose={close}>
				<AdminInfoControl />
			</Modal>
		</Box>
	)
}
