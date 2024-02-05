import * as React from 'react'

import useAudioRecorder from '@/hooks/useAudioRecord'
import { ReactMic } from 'react-mic'
import cls from './style.module.scss'

export const RecordVoice = () => {
	const recordContext = useAudioRecorder()

	const onStop = (recordedBlob) => {
		recordContext?.stopRecording(recordedBlob)
	}

	return (
		<ReactMic
			record={recordContext?.isRecording}
			onStop={onStop}
			backgroundColor="blue"
			strokeColor="white"
			className={cls.voiceContainer}
		/>
	)
}
