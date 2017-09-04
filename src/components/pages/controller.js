// @flow
import React from 'react'

import type { EventType, QuizType, EventStatusType } from '../../types'

type EventFacilitatorPropsType = {
  event: EventType,
  quiz: QuizType,
  startQuiz: Function,
}
export const EventFacilitator = ({ quiz, event, startQuiz }: EventFacilitatorPropsType) => {
  return (
    <div>
      <h1>{event.eventTitle}</h1>
      <button onClick={() => startQuiz()}>
        {quiz.quizTitle}を始める
      </button>
    </div>
  )
}

type QuizeFacilitatorPropsType = {
  event: EventType,
  eventStatus: EventStatusType,
  nextQuizContent: Function,
}
export const QuizeFacilitator = ({ event, eventStatus, nextQuizContent }: QuizeFacilitatorPropsType) => {
  return (
    <div>
      <h1>{event.eventTitle}</h1>
      <h3>{eventStatus.quizContent.qText}</h3>
      <ul>
        {['a', 'b', 'c', 'd'].map((choice) => (
          <li key={choice}>
            {choice}: {eventStatus.quizContent.choices[choice]}
          </li>
        ))}
      </ul>
      <button onClick={nextQuizContent}>次のクイズ</button>
    </div>
  )
}
