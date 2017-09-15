// @flow
import React from 'react'

import type { MemberDataType, EventStatusDataType, ChoiceType } from '../../types'

type PropsType = {
  member: MemberDataType,
  eventStatus: EventStatusDataType,
  myAnswer: ?ChoiceType,
  answer: (choice: ChoiceType) => void,
}
export default ({ member, eventStatus, myAnswer, answer }: PropsType) => {
  const { quizContentIndex, quizContent } = eventStatus

  return (
    <div>
      <h1>第{quizContentIndex + 1}問</h1>
      <h3>{quizContent.qText}</h3>
      {['a', 'b', 'c', 'd'].map(choice => (
        <div key={choice}>
          <button onClick={() => answer(choice)} disabled={!!myAnswer}>
            {choice}: {quizContent[choice]}
          </button>
        </div>
      ))}
      {myAnswer && <div>{member.nickname}さんの回答： {myAnswer}</div>}
    </div>
  )
}
