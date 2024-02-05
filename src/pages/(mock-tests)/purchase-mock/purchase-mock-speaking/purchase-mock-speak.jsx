import { Layout } from '@/components/LayoutComponents/Layout'
import { RecordVoice } from '@/components/RecordVoice/RecordVoice'
import { QuestionsList } from '@/components/SpeakingComponents/QuestionsList'
import { SpeakingAudioContext } from '@/contexts/SpeakingAudioContext'
import { StepperContext } from '@/contexts/StepperContext'
import useAudioRecorder from '@/hooks/useAudioRecord'
import { useGetData } from '@/hooks/useGetData'
import { API_COLLECTIONS } from '@/services/api/api-collection'
import { getFirestoreCollections } from '@/services/api/docs'
import { Box, Button, Stepper, Text, Title, Group } from '@mantine/core'
import { IconDownload, IconPlayerPause } from '@tabler/icons-react'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PurchaseMockSpeak() {
	const [searchParams] = useSearchParams()
	const [questions, setQuestions] = useState([])
	const recordHook = useAudioRecorder()
	const sterpperContext = useContext(StepperContext)
	const audioRefContext = useContext(SpeakingAudioContext)

	const { data, status, isLoading, isFetching } = useGetData(
		['purchase-mock-tests'],
		async () => {
			const questions = await getFirestoreCollections(
				API_COLLECTIONS.PURCHASE_MOCK_TESTS
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
					console.log('data', data)

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

	return (
		<Layout>
			<Title order={3}>Purchase Tests</Title>
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
					<Text fw="bold" my={10} style={{ fontSize: '1.2rem' }}>
						You Can Download Your Audio Record Voice
					</Text>
					<Group>
						<Button
							disabled={!recordHook?.blobObject}
							rightSection={<IconDownload />}
							onClick={downloadRecordVoice}
							size="md"
						>
							Download Record Voice
						</Button>
						<Button
							onClick={() => {
								recordHook?.stopRecording()
							}}
							rightSection={<IconPlayerPause />}
							size="md"
						>
							Stop Recording
						</Button>
					</Group>
				</Stepper.Completed>
			</Stepper>
		</Layout>
	)
}
