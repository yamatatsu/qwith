// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import _map from 'lodash/map'
import BasicTemplate from '../templates/basic'
import EventForm from '../../containers/settings/event_form'
import QuizForm from '../../containers/settings/quiz_form'

import type { EventKeyType, OwnerDataType, EventDataType, QuizDataType } from '../../types'

type PropsType = {
  owner: ?OwnerDataType,
  isOpenNewEvent: boolean,
  saveEvent: (eventKey: EventKeyType) => (event: EventDataType) => void,
  createEvent: () => (event: EventDataType) => void,
  saveQuiz: (eventKey: EventKeyType) => (quiz: QuizDataType) => void,
  openNewEvent: Function,
}
export default ({ owner, isOpenNewEvent, saveEvent, createEvent, saveQuiz, openNewEvent }: PropsType) => {
  return (
    <BasicTemplate>
      <h1>Settings</h1>
      <button onClick={openNewEvent}>イベント作成</button>

      {isOpenNewEvent && (
        <EventForm event={{ eventTitle: '' }} saveEvent={createEvent()} />
      )}

      {owner && _map(owner.events, (event, eventKey) => {
        const quiz = owner && owner.quizes && owner.quizes[eventKey]
        return <Event key={eventKey} {...{ eventKey, event, quiz, saveEvent: saveEvent(eventKey), saveQuiz: saveQuiz(eventKey) }}/>
      })}
    </BasicTemplate>
  )
}

type EventPropsType = {
  eventKey: EventKeyType,
  event: EventDataType,
  quiz: ?QuizDataType,
  saveEvent: (event: EventDataType) => void,
  saveQuiz: (quiz: QuizDataType) => void,
}
const Event = ({ eventKey, event, quiz, saveEvent, saveQuiz }: EventPropsType) => (
  <div>
    <EventForm event={event} saveEvent={saveEvent} />
    <Link to={`/${eventKey}/controller`}>
      <button>始める</button>
    </Link>
    <br/>
    <br/>
    <QuizForm quiz={quiz} saveQuiz={saveQuiz} />
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
)
