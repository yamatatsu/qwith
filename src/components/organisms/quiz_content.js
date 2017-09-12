// @flow
import React from 'react'
import type { EventStatusType } from '../../domain/entities/eventStatus'


type PropsType = { eventStatus: EventStatusType }

const QuizContent = ({ eventStatus }: PropsType) => {
  const { quizContentIndex, quizContent, quizContentIndexMax } = eventStatus

  return (
    <div>
      <h3>{quizContent.qText}</h3>
      <ul>
        {['a', 'b', 'c', 'd'].map((choice) => (
          <li key={choice}>
            {choice}: {quizContent[choice]}
          </li>
        ))}
      </ul>
      <div>{quizContentIndex + 1}問目 / {quizContentIndexMax}問中</div>
    </div>
  )
}

export default QuizContent
