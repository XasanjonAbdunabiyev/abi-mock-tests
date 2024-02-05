import { Box, Tooltip, useMantineColorScheme } from '@mantine/core'
import { MoonIcon, SunIcon } from 'lucide-react'
export function ThemeSwitch() {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme()
	return (
		<Tooltip label={colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}>
			<Box onClick={toggleColorScheme} style={{ cursor: 'pointer' }}>
				{colorScheme === 'dark' ? (
					<SunIcon fontSize={32} />
				) : (
					<MoonIcon fontSize={32} />
				)}
			</Box>
		</Tooltip>
	)
}
