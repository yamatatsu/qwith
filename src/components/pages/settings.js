// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import _map from 'lodash/map'
import BasicTemplate from '../templates/basic'
import EventForm from '../../containers/settings/event_form'
import QuizForm from '../../containers/settings/quiz_form'
import QuizContentForm from '../../containers/settings/quiz_content_form'

import type { EventKeyType, OwnerDataType, EventDataType, QuizDataType, QuizContentDataType } from '../../types'

type PropsType = {
  owner: ?OwnerDataType,
  saveEvent: (eventKey: EventKeyType) => (event: EventDataType) => void
}
export default ({ owner, saveEvent }: PropsType) => {
  if (!owner) return <BasicTemplate>イベント未登録</BasicTemplate>

  const { events, quizes, quizContents: quizContentsObj } = owner
  return (
    <BasicTemplate>
      <h1>Settings</h1>
      {_map(events, (event, eventKey) => {
        const quiz = quizes && quizes[eventKey]
        const quizContents = quizContentsObj && quizContentsObj[eventKey]
        return <Event key={eventKey} {...{ eventKey, event, quiz, quizContents, saveEvent: saveEvent(eventKey) }}/>
      })}
    </BasicTemplate>
  )
}

const Event = ({ eventKey, event, quiz, quizContents, saveEvent }: { eventKey: EventKeyType, event: EventDataType, quiz: ?QuizDataType, quizContents: ?QuizContentDataType[], saveEvent: (event: EventDataType) => void }) => (
  <div>
    <EventForm event={event} saveEvent={saveEvent} />
    <Link to={`/${eventKey}/controller`}>
      <button>始める</button>
    </Link>
    <br/>
    <br/>
    {(quiz && quizContents) ? <Quiz {...{ quiz, quizContents }} /> : 'クイズが未登録'}
  </div>
)

const Quiz = ({ quiz, quizContents }: { quiz: QuizDataType, quizContents: QuizContentDataType[] }) => (
  <div>
    <QuizForm quiz={quiz} />
    <br/>
    {quizContents.map((quizContent, index) => (
      <QuizContentForm key={index} quizContent={quizContent} />
    ))}
  </div>
)
