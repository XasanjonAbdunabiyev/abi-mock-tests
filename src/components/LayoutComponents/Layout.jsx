import React from 'react'
import propTypes from 'prop-types'
import { HeaderMegaMenu } from './Header/Navbar'
import { Container } from '@mantine/core'
import { Footer } from './Footer/Footer'

export function Layout(props) {
	return (
		<React.Fragment>
			<HeaderMegaMenu />
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
