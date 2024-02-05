// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import '@mantine/core/styles.css'
import { NavigationProgress } from '@mantine/nprogress'
import '@mantine/nprogress/styles.css'
import propTypes from 'prop-types'

import { Box, MantineProvider, createTheme } from '@mantine/core'

const themeConfig = createTheme({
	colorScheme: 'dark',
	colors: {
		'oklch-blue': [
			'oklch(96.27% 0.0217 238.66)',
			'oklch(92.66% 0.0429 240.01)',
			'oklch(86.02% 0.0827 241.66)',
			'oklch(78.2% 0.13 243.83)',
			'oklch(71.8% 0.1686 246.06)',
			'oklch(66.89% 0.1986 248.32)',
			'oklch(62.59% 0.2247 250.29)',
			'oklch(58.56% 0.2209 251.26)',
			'oklch(54.26% 0.2067 251.67)',
			'oklch(49.72% 0.1888 251.59)',
		],

		dark: [
			'#d5d7e0',
			'#acaebf',
			'#8c8fa3',
			'#666980',
			'#4d4f66',
			'#34354a',
			'#2b2c3d',
			'#1d1e30',
			'#0c0d21',
			'#01010a',
		],
	},
	// fontFamily: 'sans-serif',
})

export function UiProvider(props) {
	return (
		<MantineProvider
			defaultColorScheme="light"
			theme={themeConfig}
			withCssVariables
		>
			<Box style={{ fontWeight: 'bold' }}>
				<NavigationProgress />
				{props.children}
			</Box>
		</MantineProvider>
	)
}

UiProvider.propTypes = {
	children: propTypes.node.isRequired,
}
