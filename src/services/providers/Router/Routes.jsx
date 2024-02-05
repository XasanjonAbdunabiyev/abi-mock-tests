import * as React from 'react'

import {
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'

import { ROUTER_ACTIONS } from './RouterActions'

import {
	DashboardScreen,
	HomeScreen,
	NotFoundScreen,
	ProfileInfoScreen,
	PurchaseMockScreen,
	PurchaseMockSpeaking,
	SignInScreen,
	SpeakingScreen,
} from '@/pages'

import { PageLoading } from '@/components/Views/Loading/PageLoadings/PageLoading'
import { RootLayouts } from '@/components/LayoutComponents/RootLayouts'

export function ProtectRoute() {
	let verify = localStorage.getItem('token')
	if (!verify) return <Navigate to="/sign-in" />
	else return <Outlet />
}

export function CheckCurrentUser() {
	const userId = localStorage.getItem('user-collection-id')
	if (!userId) return <Navigate to="/sign-in" />
	else return <Outlet />
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={ROUTER_ACTIONS.HOME} element={<RootLayouts />}>
			<Route path={ROUTER_ACTIONS.HOME} element={<HomeScreen />} />
			<Route element={<ProtectRoute />}>
				<Route
					path={ROUTER_ACTIONS.DASHBOARD}
					element={<DashboardScreen />}
				/>
			</Route>
			<Route element={<CheckCurrentUser />}>
				<Route
					path={ROUTER_ACTIONS.PURCHASE_MOCK}
					element={<PurchaseMockScreen />}
				/>
				<Route
					path={ROUTER_ACTIONS.PURCHASE_MOCK_SPEAKING}
					element={<PurchaseMockSpeaking />}
				/>
			</Route>
			<Route
				path={ROUTER_ACTIONS.SPEAKING}
				element={<SpeakingScreen />}
			/>
			<Route path={ROUTER_ACTIONS.SIGN_IN} element={<SignInScreen />} />
			<Route
				path={ROUTER_ACTIONS.PROFILE_INFO}
				element={<ProfileInfoScreen />}
			/>
			<Route
				path={ROUTER_ACTIONS.NOTFOUND}
				element={<NotFoundScreen />}
			/>
		</Route>
	)
)

export default function PageRouterProvider() {
	return (
		<React.Suspense fallback={<PageLoading />}>
			<RouterProvider router={router} />
		</React.Suspense>
	)
}
