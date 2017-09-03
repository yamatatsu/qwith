// @flow
import React from 'react'
import _map from 'lodash/map'

import type { EventType, QuizesType, EventStatusType } from '../../types'

type QuizeSelecterPropsType = {
  event: EventType,
  quizes: QuizesType,
  startQuiz: Function,
}
export const QuizeSelecter = ({ quizes, event, startQuiz }: QuizeSelecterPropsType) => {
  return (
    <div>
      <h1>{event.eventTitle}</h1>
      {_map(event.quizKeys, (quizKey) => (
        <div key={quizKey}>
          <button onClick={() => startQuiz(quizKey)}>
            {quizes[quizKey].quizTitle}を始める
          </button>
        </div>
      ))}
    </div>
  )
}

type QuizeFacilitatorPropsType = {
  event: EventType,
  quizes: QuizesType,
  eventStatus: EventStatusType,
  nextQuizContent: Function,
}
export const QuizeFacilitator = ({ event, quizes, eventStatus, startQuiz, nextQuizContent }: QuizeFacilitatorPropsType) => {
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
