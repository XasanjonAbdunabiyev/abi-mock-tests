import * as React from 'react'
import { motion } from 'framer-motion'

import { Box, Text } from '@mantine/core'
import style from './style.module.scss'

const icon = {
	hidden: {
		opacity: 0,
		pathLength: 0,
		fill: 'rgba(255, 255, 255, 0)',
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		fill: 'rgba(255, 255, 255, 1)',
	},
}

export const PageLoading = () => {
	return (
		<Box className={style.container_screen}>
			<Box className={style.container}>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					className={style.item}
				>
					<motion.path
						d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
						variants={icon}
						initial="hidden"
						animate="visible"
						transition={{
							default: { duration: 2, ease: 'easeInOut' },
							fill: { duration: 2, ease: [1, 0, 0.8, 1] },
						}}
					/>
				</motion.svg>
			</Box>
			<Text className={style.loading_text}>Loading...</Text>
		</Box>
	)
}
