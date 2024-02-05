import { useEffect, useState, useContext } from 'react'
import { Layout } from '@/components/LayoutComponents/Layout'
import { Title, Box, Stepper, Button, Group, Text } from '@mantine/core'

import { StepperContext } from '@/contexts/StepperContext'
import { SpeakingAudioContext } from '@/contexts/SpeakingAudioContext'

import { RecordVoice } from '@/components/RecordVoice/RecordVoice'
import { QuestionsList } from '@/components/SpeakingComponents/QuestionsList'
import { useGetData } from '@/hooks/useGetData'
import { API_COLLECTIONS } from '@/services/api/api-collection'
import { getFirestoreCollections } from '@/services/api/docs'
import { notifications } from '@mantine/notifications'
import { useSearchParams } from 'react-router-dom'
import useAudioRecorder from '@/hooks/useAudioRecord'
import { IconPlayerPause, IconDownload } from '@tabler/icons-react'

export default function SpeakingScreen() {
	const [searchParams] = useSearchParams()
	const [questions, setQuestions] = useState([])
	const recordHook = useAudioRecorder()
	const sterpperContext = useContext(StepperContext)
	const audioRefContext = useContext(SpeakingAudioContext)

	const { data, status, isLoading, isFetching, isError } = useGetData(
		['practice-questions'],
		async () => {
			const questions = await getFirestoreCollections(
				API_COLLECTIONS.FREE_MOCK_TESTS
			)
			if (!questions.length) {
				return []
			} else {
				return questions
			}
		}
	)

	/* The code snippet is using the `useSearchParams` hook from the `react-router-dom` library to get the
	value of the query parameter `question-id` from the URL. */
	const query = searchParams.get('question-id')

	useEffect(() => {
		if (!query) {
			const getFirstQuestion = async () => {
				if (status === 'pending' && isLoading && isFetching) {
					notifications.show({
						title: 'Loading Page...',
						message: 'Pending requests',
						autoClose: 2000,
					})
				} else if (status === 'success') {
					const [firstElement] = data
					setQuestions(firstElement)
				}
			}
			getFirstQuestion()
		} else {
			data?.filter((item) => {
				if (item.id === query) {
					setQuestions(item)
				}
			})
		}
	}, [query, status])

	function handleStartQuestions() {
		recordHook?.startRecording()
		audioRefContext.audioRef?.current?.play()
		audioRefContext?.toggle()
	}

	function downloadRecordVoice() {
		recordHook?.downloadAudio()
		window.location.reload()
	}

	if (status === 'pending' && isLoading && isFetching)
		return <p>Loading...</p>
	else if (status === 'error' && isError) return <p>Error</p>

	return (
		<Layout>
			<Title order={3}>Practise Tests</Title>
			<RecordVoice />
			<Stepper
				my={10}
				radius="sm"
				size="lg"
				active={sterpperContext?.active}
			>
				<Stepper.Step label="First questions part">
					<Box className="part_one">
						<QuestionsList
							questions={questions?.part_one}
							itemsPerpage={1}
						/>
						<Button
							variant="light"
							size="lg"
							tt="uppercase"
							fullWidth
							display={
								audioRefContext?.isClicked ? 'none' : 'block'
							}
							onClick={handleStartQuestions}
						>
							Start Questions
						</Button>
					</Box>
				</Stepper.Step>
				<Stepper.Step label="The second part is questions">
					<QuestionsList
						itemsPerpage={1}
						questions={questions?.part_two}
					/>

					<Button
						tt="uppercase"
						fullWidth
						size="lg"
						variant="light"
						onClick={handleStartQuestions}
						display={audioRefContext?.isClicked ? 'none' : 'block'}
						style={{ fontSize: '1.2rem', letterSpacing: 1 }}
					>
						Start Questions
					</Button>
				</Stepper.Step>
				<Stepper.Step label="The third part is questions">
					<Text>{questions?.length}</Text>
					<QuestionsList
						itemsPerpage={1}
						questions={questions?.part_three}
					/>
					<Button
						variant="light"
						size="lg"
						tt="uppercase"
						fullWidth
						display={audioRefContext?.isClicked ? 'none' : 'block'}
						onClick={handleStartQuestions}
					>
						Start Questions
					</Button>
				</Stepper.Step>

				<Stepper.Completed>
					You Can Download This Your Audio
					<Group my={10}>
						<Button
							variant="light"
							rightSection={<IconPlayerPause />}
							onClick={() => {
								recordHook?.stopRecording()
							}}
						>
							Stop Recording
						</Button>
						<Button
							variant="light"
							rightSection={<IconDownload />}
							onClick={downloadRecordVoice}
							disabled={!recordHook?.blobObject}
						>
							Audio Download
						</Button>
					</Group>
				</Stepper.Completed>
			</Stepper>
		</Layout>
	)
}
