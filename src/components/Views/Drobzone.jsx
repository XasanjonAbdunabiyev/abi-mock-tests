import { useState } from 'react'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/services/firebase/configs'

import {
	ActionIcon,
	Box,
	CopyButton,
	Flex,
	Group,
	Text,
	Tooltip,
	rem,
} from '@mantine/core'

import { Dropzone } from '@mantine/dropzone'

import {
	IconCheck,
	IconCopy,
	IconPhoto,
	IconUpload,
	IconX,
} from '@tabler/icons-react'

export function Drobzone(props) {
	const [audioUrl, setAudioUrl] = useState('')
	const [loading, setLoading] = useState(false)

	const handleDrop = async (files) => {
		let currentTargetFiles = files[0]
		setLoading(true)
		if (currentTargetFiles) {
			let storageRef = ref(storage, `audio/${currentTargetFiles?.name}`)
			let uploadTask = uploadBytesResumable(
				storageRef,
				currentTargetFiles
			)
			uploadTask.on(
				'state_changed',
				(_snapshot) => {},
				(error) => {
					console.error('Error uploading audio file', error)
					setLoading(false)
				},
				async () => {
					setTimeout(async () => {
						const downloadURL = await getDownloadURL(
							uploadTask.snapshot.ref
						)
						setAudioUrl(downloadURL)
						sessionStorage.setItem('AUDIO_URL', downloadURL)
						setLoading(false)
					}, 4000)
				}
			)
		}
	}

	return (
		<>
			{loading && <p>Loading...</p>}
			{audioUrl && (
				<Box>
					<CopyButton value={audioUrl} timeout={1000}>
						{({ copied, copy }) => (
							<>
								{audioUrl && (
									<Flex gap={10} align="center">
										<Tooltip
											label={copied ? 'Copied' : 'Copy'}
											withArrow
											position="right"
										>
											<ActionIcon
												color={copied ? 'teal' : 'gray'}
												variant="subtle"
												onClick={copy}
											>
												{copied ? (
													<IconCheck
														style={{
															width: rem(16),
														}}
													/>
												) : (
													<IconCopy
														style={{
															width: rem(16),
														}}
													/>
												)}
											</ActionIcon>
										</Tooltip>
										<Text
											fw="bolder"
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												whiteSpace: 'nowrap',
												display: 'inline-block',
												color: '#228BE6',
												textDecoration: 'underline',
												maxWidth: '80%',
											}}
										>
											{audioUrl}
										</Text>
									</Flex>
								)}
							</>
						)}
					</CopyButton>
				</Box>
			)}
			<Dropzone
				onDrop={(files) => handleDrop(files)}
				onReject={(files) => console.log('rejected files', files)}
				{...props}
			>
				<Group
					justify="center"
					gap="xl"
					mih={220}
					style={{
						pointerEvents: 'none',
						border: `1px solid #ccc`,
						padding: 10,
						borderRadius: 10,
					}}
				>
					<Dropzone.Accept>
						<IconUpload
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-blue-6)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Accept>
					<Dropzone.Reject>
						<IconX
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-red-6)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Reject>
					<Dropzone.Idle>
						<IconPhoto
							style={{
								width: rem(52),
								height: rem(52),
								color: 'var(--mantine-color-dimmed)',
							}}
							stroke={1.5}
						/>
					</Dropzone.Idle>

					<div>
						<Text size="md" inline style={{ fontWeight: 'bold' }}>
							Drag images here or click to select files
						</Text>
						<Text
							size="xs"
							c="dimmed"
							inline
							mt={7}
							style={{ fontWeight: 'bold', lineHeight: 2 }}
						>
							Attach as many files as you like, each file should
							not exceed 15mb
						</Text>
					</div>
				</Group>
			</Dropzone>
		</>
	)
}
