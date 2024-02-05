/* This code is importing the necessary functions from the Firebase library to initialize and access
the Firestore database. */

import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCBoaPVgW3u6cpsoXkP7RvyqGgbj1dS5VY',
	authDomain: 'english-mock-test-63a90.firebaseapp.com',
	projectId: 'english-mock-test-63a90',
	storageBucket: 'english-mock-test-63a90.appspot.com',
	messagingSenderId: '283720434020',
	appId: '1:283720434020:web:2b4376c7976601a8bc7a71',
}

const app = initializeApp(firebaseConfig)
export const firestore_db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
