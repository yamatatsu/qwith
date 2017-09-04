// @flow
import React from 'react'

import type { EventStatusDataType, ChoiceType } from '../../types'

type PropsType = {
  eventStatus: EventStatusDataType,
  myAnswer: ?ChoiceType,
  answer: Function,
}
export default ({ eventStatus, answer, myAnswer }: PropsType) => {
  const { quizContentIndex, quizContent } = eventStatus
  return (
    <div>
      <h1>第{quizContentIndex + 1}問</h1>
      <h3>{quizContent.qText}</h3>
      {['a', 'b', 'c', 'd'].map(choice => (
        <div key={choice}>
          <button onClick={() => answer(choice)} disabled={!!myAnswer}>
            {choice}: {quizContent.choices[choice]}
          </button>
        </div>
      ))}
      {myAnswer && <div>あなたの回答： {myAnswer}</div>}
    </div>
  )
}
