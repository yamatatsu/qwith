// @flow
import React from 'react'

import type { EventKeyType, MemberKeyType, EventStatusType } from '../../types'

type PropsType = {
  eventKey: EventKeyType,
  memberKey: MemberKeyType,
  eventStatus: EventStatusType,
  answer: Function,
}
export default ({ eventKey, memberKey, eventStatus, answer }: PropsType) => {
  const { quizContentIndex } = eventStatus
  return (
    <div>
      <h1>第{quizContentIndex + 1}問</h1>
      <h3>{eventStatus.quizContent.qText}</h3>
      {['a', 'b', 'c', 'd'].map(choice => (
        <div key={choice}>
          <button onClick={() => answer(choice)}>
            {choice}: {eventStatus.quizContent.choices[choice]}
          </button>
        </div>
      ))}
    </div>
  )
}
