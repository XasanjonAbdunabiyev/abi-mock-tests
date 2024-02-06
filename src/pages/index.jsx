import * as React from 'react'

const HomeScreen = React.lazy(() => import('./home/home-screen'))

const DashboardScreen = React.lazy(() => import('./dashboard/dashboard-screen'))

const NotFoundScreen = React.lazy(() => import('./error-pages/404/not-found'))

const ProfileInfoScreen = React.lazy(
	() => import('./(auth)/profile-info/profile-info-screen')
)

const PurchaseMockScreen = React.lazy(
	() => import('./(mock-tests)/purchase-mock/purchase-mock-screen')
)

const PurchaseMockSpeaking = React.lazy(
	() =>
		import(
			'./(mock-tests)/purchase-mock/purchase-mock-speaking/purchase-mock-speak'
		)
)

const SignInScreen = React.lazy(() => import('./(auth)/sign-in/sign-in-screen'))

const SpeakingScreen = React.lazy(
	() => import('./(mock-tests)/speaking-mock/speaking-screen')
)

export {
	HomeScreen,
	DashboardScreen,
	PurchaseMockScreen,
	NotFoundScreen,
	ProfileInfoScreen,
	SignInScreen,
	PurchaseMockSpeaking,
	SpeakingScreen,
}
