import { Box, Select } from '@mantine/core'

export function UserSelect(props) {
	return (
		<Box className="user__select" {...props}>
			<Select onChange={props?.handleChange}></Select>
		</Box>
	)
}
