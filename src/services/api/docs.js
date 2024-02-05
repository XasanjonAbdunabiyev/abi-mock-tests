/**
 * The function `getFirestoreCollections` retrieves all documents from a Firestore collection
 * specified by the `collectionName` parameter and logs the ID of each document.
 * @param collectionName - The `collectionName` parameter is a string that represents the name of the
 * collection in the Firestore database from which you want to retrieve the questions.
 */

import { firestore_db } from '@/services/firebase/configs'

/* The `import` statement is used to import specific functions from the `'firebase/firestore'` module.
In this case, it is importing the following functions: */

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
} from 'firebase/firestore'

import { v4 as uuidV4 } from 'uuid'
import { API_COLLECTIONS } from './api-collection'

export async function getFirestoreCollections(collectionName) {
	const querySnapshot = await getDocs(
		collection(firestore_db, collectionName)
	)
	const docsSnap = querySnapshot?.docs?.map((doc) => ({
		...doc?.data(),
		id: doc.id,
	}))

	return docsSnap
}

/**
 * The function adds a user to a users database with their email, password, and a generated appId, and
 * stores the user's collection id in local storage.
 * @param email - The email parameter is the email address of the user that you want to add to the
 * users database.
 * @param password - The `password` parameter is the password of the user that you want to add to the
 * users database.
 */

export const addUsersToUsersDatabase = async function (email, password) {
	await addDoc(collection(firestore_db, API_COLLECTIONS.USERS), {
		appId: `${uuidV4()}`,
		email,
		password,
		isPaid: false,
	}).then((user) => {
		localStorage.setItem('user-collection-id', user?.id)
	})
}

/**
 * The function `deleteUsersFromUsersDatabase` deletes a user document from a Firestore database using
 * the provided user ID.
 * @param userId - The `userId` parameter is the unique identifier of the user that you want to delete
 * from the users database.
 */

export const deleteUsersFromUsersDatabase = async (userId) =>
	await deleteDoc(doc(firestore_db, API_COLLECTIONS.USERS, userId))
		.then((res) => res)
		.catch((error) => error)

export async function getCurretUser(userId) {
	const docRef = doc(firestore_db, API_COLLECTIONS.USERS, userId)
	const docSnap = await getDoc(docRef)
	if (!docSnap?.exists()) {
		return null
	} else {
		return docSnap?.data()
	}
}

export function wait(time = 3000) {
	return Promise((resolve) => {
		setTimeout(resolve, time)
	})
}
