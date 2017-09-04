// @flow
import React from 'react'

import type { EventDataType, QuizDataType, QuizContentDataType } from '../../types'

type EventFacilitatorPropsType = {
  event: EventDataType,
  quiz: QuizDataType,
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
  event: EventDataType,
  quizContent: QuizContentDataType,
  continueQuiz: Function,
}
export const QuizeFacilitator = ({ event, quizContent, continueQuiz }: QuizeFacilitatorPropsType) => {
  return (
    <div>
      <h1>{event.eventTitle}</h1>
      <h3>{quizContent.qText}</h3>
      <ul>
        {['a', 'b', 'c', 'd'].map((choice) => (
          <li key={choice}>
            {choice}: {quizContent.choices[choice]}
          </li>
        ))}
      </ul>
      <button onClick={continueQuiz}>次のクイズ</button>
    </div>
  )
}
