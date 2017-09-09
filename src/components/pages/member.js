// @flow
import React from 'react'

import type { MemberType } from '../../domain/entities/member'

type PropsType = { member: MemberType }
export default ({ member }: PropsType) => {
  const { eventStatus, answer, myAnswer } = member
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
      {myAnswer && <div>あなたの回答： {myAnswer}</div>}
    </div>
  )
}
