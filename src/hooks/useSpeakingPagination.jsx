import { useState } from 'react'

/**
 * The `useSpeakingPagination` function is a custom React hook that handles pagination for a given data
 * array and number of items per page.
 * @returns The useSpeakingPagination function returns an object with the following properties:
 */

export const useSpeakingPagination = function (data, itemsPerPage) {
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(data?.length / itemsPerPage)

	const startIndex = (currentPage - 1) * itemsPerPage

	const endIndex = startIndex + itemsPerPage

	const currentData = data?.slice(startIndex, endIndex)

	console.log(currentData)

	const handlePageChange = (page) => {
		setCurrentPage(page + 1)
	}

	return {
		currentData,
		totalPages,
		setCurrentPage,
		currentPage,
		handlePageChange,
	}
}
