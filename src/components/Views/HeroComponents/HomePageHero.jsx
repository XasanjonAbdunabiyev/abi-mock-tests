import { Container, Title } from '@mantine/core'
import classes from './style.module.scss'

export function HeroImageRight() {
	return (
		<div className={classes.root}>
			<Container size="lg">
				<div className={classes.inner}>
					<div className={classes.content}>
						<Title className={classes.title}>
							Test Online, Anytime, Anywhere MULTILeveL English
							Test
						</Title>
					</div>
				</div>
			</Container>
		</div>
	)
}
