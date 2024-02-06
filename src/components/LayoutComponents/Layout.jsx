import React from 'react'
import propTypes from 'prop-types'
import { HeaderMegaMenu } from './Header/Navbar'
import { OverviewButton } from '../Views/OverviewComponents/OverviewButton'
import { Container } from '@mantine/core'
import { Footer } from './Footer/Footer'
import { AffixContainer } from '@/components/Views/Affix/Affix'

export function Layout(props) {
	return (
		<React.Fragment>
			<OverviewButton />
			<HeaderMegaMenu />
			<AffixContainer />
			<Container size="xl">
				{props?.children}
				<Footer />
			</Container>
		</React.Fragment>
	)
}

Layout.propTypes = {
	children: propTypes.node,
}
