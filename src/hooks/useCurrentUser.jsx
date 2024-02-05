/**
 * The `useCurrentUser` function is a custom hook that returns the current user from the `AuthContext`
 * in a React application.
 * @returns The `useCurrentUser` function returns the current user from the `AuthContext`.
 */

import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
export const useCurrentUser = function () {
	return useContext(AuthContext)
}
