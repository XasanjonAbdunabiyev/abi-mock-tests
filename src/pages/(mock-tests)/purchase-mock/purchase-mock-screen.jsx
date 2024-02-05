import React, { useEffect, useState } from 'react'

import { Layout } from '@/components/LayoutComponents/Layout'
import { useGetData } from '@/hooks/useGetData'
import { API_COLLECTIONS } from '@/services/api/api-collection'

import { getFirestoreCollections, getCurretUser } from '@/services/api/docs'

import { PageLoading } from '@/components/Views/Loading/PageLoadings/PageLoading'
import { PurchaseMockBanner } from '@/components/PurchaseMockComonents/PurchaseMockHeros/PurchaseMockHero'
import { PurchaseMockTable } from '@/components/PurchaseMockComonents/PurchaseMockTable/PurchaseMockTableSection'

export default function PurchaseMockScreen() {
	const [currentUser, setCurrentUser] = useState({
		appId: '',
		email: '',
		isPaid: false,
		password: '',
	})

	const {
		data: questions,
		status,
		isLoading,
		isFetching,
		isError,
	} = useGetData(['purchase-mock-questions'], async () => {
		const questions = await getFirestoreCollections(
			API_COLLECTIONS.PURCHASE_MOCK_TESTS
		)
		if (!questions.length) return []
		else return questions
	})

	let userId = localStorage.getItem('user-collection-id')
	useEffect(() => {
		let isMounted = true
		const fetchUserIsPaid = async () => {
			try {
				if (isMounted) {
					await getCurretUser(userId).then((userResponse) => {
						setCurrentUser(userResponse)
					})
				}
			} catch (error) {
				console.log('Fetching feailed')
			}
		}
		fetchUserIsPaid()
		return () => {
			isMounted = false
		}
	}, [userId])

	if (status === 'pending' && isLoading && isFetching) return <PageLoading />
	else if (status === 'error' && isError) return <p>Error</p>

	return (
		<Layout>
			<PurchaseMockBanner />
			<PurchaseMockTable
				questions={questions}
				userIsPaid={currentUser?.isPaid}
			/>
		</Layout>
	)
}
