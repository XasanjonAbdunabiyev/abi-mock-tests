import { Box, Button, Modal } from '@mantine/core'

import useAudioRecorder from '@/hooks/useAudioRecord'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

export function DownloadAudio(props) {
	const recordContext = useAudioRecorder()

	const [opened, { open, close }] = useDisclosure(false)
	const isMobile = useMediaQuery('(max-width: 50em)')

	return (
		<Box>
			<Button onClick={open}>View my result</Button>
			<Modal
				opened={opened}
				onClose={close}
				title="Your Results"
				fullScreen={isMobile}
				transitionProps={{ transition: 'fade', duration: 200 }}
			>
				<Button
					mx={5}
					disabled={!recordContext?.isRecording}
					onClick={recordContext?.stopRecording}
				>
					Stop Recording
				</Button>
				<Button
					onClick={() => recordContext?.downloadAudio()}
					disabled={!recordContext?.blobObject}
				>
					Download Your Record Voice
				</Button>
			</Modal>
		</Box>
	)
}
