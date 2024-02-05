import { useState } from 'react'

export const useLocalStorage = function (key, defaultValue) {
	const [localStorageValue, setLocalStorageValue] = useState(() => {
		try {
			const value = localStorage.getItem(key)
			if (value) {
				return JSON.stringify(value)
			} else {
				localStorage.setItem(key, JSON.stringify(defaultValue))
				return defaultValue
			}
		} catch (error) {
			localStorage.setItem(key, JSON.stringify(defaultValue))
			return defaultValue
		}
	})

	const setLocalStorageStateValue = function (valueOrFn) {
		let newValue
		if (typeof valueOrFn === 'function') {
			let fn = valueOrFn
			newValue = fn(localStorageValue)
		} else {
			newValue = valueOrFn
		}
		localStorage.setItem(key, JSON.stringify(newValue))
		setLocalStorageValue(newValue)
	}

	return [localStorageValue, setLocalStorageStateValue]
}
