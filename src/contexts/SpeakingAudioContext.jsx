import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { createContext, useRef } from 'react'

export const SpeakingAudioContext = createContext(null)

export default function SpeakingAudioContextProvider(props) {
	const audioRef = useRef(null)
	const [isClicked, setIsClicked] = useState(false)
	const toggle = () => setIsClicked(true)

	return (
		<SpeakingAudioContext.Provider value={{ audioRef, toggle, isClicked }}>
			{props.children}
		</SpeakingAudioContext.Provider>
	)
}

SpeakingAudioContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
