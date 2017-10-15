// @flow
import React from 'react'
import type { EventDataType } from '../../types'


type PropsType = { event: EventDataType }

const QuizContent = ({ event }: PropsType) => {
  const { quizContentIndex, quizContent, quizContentIndexMax } = event

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
