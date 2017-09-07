// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import _map from 'lodash/map'
import BasicTemplate from '../templates/basic'

import type { OwnerDataType, EventsDataType, QuizesDataType, QuizDataType } from '../../types'

type PropsType = { owner: ?OwnerDataType }
export default ({ owner }: PropsType) => {

  return (
    <BasicTemplate>
      <h1>Settings</h1>
      {owner ? <EventList events={owner.events} quizes={owner.quizes} /> : 'イベント未登録'}
    </BasicTemplate>
  )
}

const EventList = ({ events, quizes }: { events: EventsDataType, quizes: ?QuizesDataType }) => (
  <div>
    {_map(events, (event, eventKey) => {
      const quiz = quizes && quizes[eventKey]
      return (
        <div key={eventKey}>
          {event.eventTitle}
          <Link to={`/${eventKey}/controller`}>
            <button>始める</button>
          </Link>
          <br/>
          <br/>
          {quiz ? <Quiz quiz={quiz} /> : 'クイズが未登録'}
        </div>
      )
    })}
  </div>
)

const Quiz = ({ quiz }: { quiz: QuizDataType }) => (
  <div>
    {quiz.quizTitle}
    <br/>
    {_map(quiz.quizContents, ({ qText, choices, answerChoice, uid }, index) => (
      <div key={index}>
        <div>問題: {qText}</div>
        {_map(choices, (c, k) => <div key={k}>{k}: {c}</div>)}
        <div>答え: {answerChoice}</div>
        <div>uid: {uid}</div>
        <br/>
      </div>
    ))}
  </div>
)
