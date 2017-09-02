// @flow
import React from 'react'
import _map from 'lodash/map'
import _get from 'lodash/get'

import type { EventType, QuizesType, EventStatusType } from '../../types'

type PropsType = {
  event: EventType,
  quizes: ?QuizesType,
  eventStatus: ?EventStatusType,
  startQuiz: Function,
  nextQuizContent: Function,
}

export default ({ event, quizes, eventStatus, startQuiz, nextQuizContent }: PropsType) => {
  return (
    <div>
      <h1>{event.eventTitle}</h1>
      {
        !eventStatus ? <QuizeSelecter {...{ quizes, quizKeys: event.quizKeys, startQuiz}}/> :
          <button onClick={nextQuizContent}>次のクイズ</button>
      }
    </div>
  )
}

const QuizeSelecter = ({ quizes, quizKeys, startQuiz }) => {
  if (!quizes || !quizKeys) return <div>クイズが未登録</div>

  return (
    <div>
      {_map(quizKeys, (quizKey) => (
        <div key={quizKey}>
          <button onClick={() => startQuiz(quizKey)}>
            {_get(quizes, `${quizKey}.quizTitle`)}を始める
          </button>
        </div>
      ))}
    </div>
  )
}
