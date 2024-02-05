import { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Title, Text } from '@mantine/core'
import { AlertCircle, Hourglass } from 'lucide-react'

import { SpeakingAudioContext } from '@/contexts/SpeakingAudioContext'
import { StepperContext } from '@/contexts/StepperContext'

import cls from './style.module.scss'
import timeSound from '@/assets/sounds/timeAnswer.mp3'

function DecrementTimeThink({ number, isPlay, func }) {
	const [currentNumber, setCurrentNumber] = useState(number)
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentNumber((prevNumber) => {
				if (isPlay) {
					const newNumber = prevNumber > 0 ? prevNumber - 1 : 0
					if (newNumber === 0) {
						func()
						clearInterval(interval)
					}
					return newNumber
				} else {
					return prevNumber
				}
			})
		}, 900)
		return () => clearInterval(interval)
	}, [number, isPlay])
	return <Title order={4}>{currentNumber} second</Title>
}

function DecrementTimeAnswer({ number, isPlay, func }) {
	const [currentNumber, setCurrentNumber] = useState(number)
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentNumber((prevNumber) => {
				if (isPlay) {
					const newNumber = prevNumber > 0 ? prevNumber - 1 : 0
					if (newNumber === 0) {
						func()
						clearInterval(interval)
					}
					return newNumber
				} else {
					return prevNumber
				}
			})
		}, 900)
		return () => clearInterval(interval)
	}, [number, isPlay])
	return <Title order={4}>{currentNumber} second</Title>
}

export function QuestionsList(props) {
	const [currentPage, setCurrentPage] = useState(1)
	const [timeThinkStartColorChanger, setTimeThinkStartColorChanger] =
		useState(false)
	const [currentQuestions, setCurrentQuestions] = useState([])
	const [audioEndedTime, setAudioEndedTime] = useState(false)
	const [endedTimeAnwer, setAudioEndedTimeAnswer] = useState(false)
	const questionsList = props?.questions
	const itemsPage = props?.itemsPerpage

	const soundAudioRef = useRef(null)
	const audioRefContext = useContext(SpeakingAudioContext)
	const stepperContext = useContext(StepperContext)

	useEffect(() => {
		const indexOfLastQuestion = currentPage * itemsPage
		const indexOfFirstQuestion = indexOfLastQuestion - itemsPage
		const currentQuestions = questionsList?.slice(
			indexOfFirstQuestion,
			indexOfLastQuestion
		)
		setCurrentQuestions(currentQuestions)
	}, [questionsList, itemsPage, currentPage])

	const handleStartAnswer = function () {
		setAudioEndedTimeAnswer(true)
		setTimeThinkStartColorChanger(false)
		soundAudioRef?.current?.play()
	}

	const endedTimeAnwerFn = () => {
		setAudioEndedTime(false)
		setAudioEndedTimeAnswer(false)
		setCurrentPage((currentPage) =>
			currentPage < questionsList?.length ? currentPage + 1 : currentPage
		)
		if (currentPage === props?.questions?.length) {
			stepperContext?.nextStep()
		}
	}

	return (
		<Box>
			<audio src={timeSound} ref={soundAudioRef} />
			{currentQuestions?.map((question) => {
				return (
					<Box key={question?.question_title}>
						<audio
							className={cls.audioContainer}
							controls
							ref={audioRefContext.audioRef}
							onEnded={() => {
								setAudioEndedTime(true)
								setTimeThinkStartColorChanger(true)
							}}
							autoPlay={audioRefContext?.isClicked}
						>
							<source src={question?.questionAudio} />
						</audio>
						<Box className={cls.questionItem}>
							<Box
								className={
									timeThinkStartColorChanger
										? cls.time_think_active
										: cls.time_think
								}
							>
								<AlertCircle fontSize={30} />
								<Text fw="bold" tt="uppercase">
									Time To Think
								</Text>
								<Box>
									<DecrementTimeThink
										func={handleStartAnswer}
										isPlay={audioEndedTime}
										number={question?.timeThink}
									/>
								</Box>
							</Box>

							<Title className={cls.question_title}>
								{question?.question_title}
							</Title>

							<Box
								className={
									endedTimeAnwer
										? cls.time_answer_active
										: cls.time_answer
								}
							>
								<Hourglass fontSize={30} />
								<Text fw="bold" tt="uppercase">
									Time Answer
								</Text>
								<DecrementTimeAnswer
									func={endedTimeAnwerFn}
									isPlay={endedTimeAnwer}
									number={question?.timeAnswer}
								/>
							</Box>
						</Box>
					</Box>
				)
			})}
		</Box>
	)
}

QuestionsList.propTypes = {
	questions: PropTypes.arrayOf(
		PropTypes.shape({
			question_title: PropTypes.string,
			timeThink: PropTypes.number,
			timeAnswer: PropTypes.number,
			questionAudio: PropTypes.string,
		})
	),
	itemsPerpage: PropTypes.number,
}
