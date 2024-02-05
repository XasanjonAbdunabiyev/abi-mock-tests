import { Button } from '@mantine/core'
import propTypes from 'prop-types'
import { memo } from 'react'

export const NavLinksGroup = memo(function ({ navlinksGroup }) {
	return navlinksGroup?.map((navLinkItem) => {
		return (
			<Button
				key={navLinkItem?.navigatePath}
				fullWidth
				size="xl"
				justify="space-between"
				rightSection={navLinkItem.icon}
				mt={15}
				component="a"
				variant="light"
				href={navLinkItem.navigatePath}
			>
				{navLinkItem.title}
			</Button>
		)
	})
})

NavLinksGroup.propTypes = {
	navlinksGroup: propTypes.arrayOf(
		propTypes.shape({
			title: propTypes.string,
			navigatePath: propTypes.string,
			icon: propTypes.element,
		})
	),
}
