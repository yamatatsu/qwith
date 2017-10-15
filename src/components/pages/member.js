// @flow
import React from 'react'

import type { EventDataType, MemberDataType, ChoiceType } from '../../types'

type PropsType = {
  event: EventDataType,
  member: MemberDataType,
  answer: (choice: ChoiceType) => void,
}
export default ({ event, member, answer }: PropsType) => {
  const { quizContentIndex, quizContent } = event

  return (
    <div>
      <div>{member.nickname}さん</div>
      <h1>第{quizContentIndex + 1}問</h1>
      <h3>{quizContent.qText}</h3>
      {['a', 'b', 'c', 'd'].map((choice: ChoiceType) => (
        <div key={choice}>
          <button onClick={() => answer(choice)}>
            {choice}: {quizContent[choice]}
          </button>
        </div>
      ))}
    </div>
  )
}
