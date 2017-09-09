// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import _map from 'lodash/map'
import BasicTemplate from '../templates/basic'
import EventForm from '../../containers/settings/event_form'
import QuizForm from '../../containers/settings/quiz_form'
import QuizContentForm from '../../containers/settings/quiz_content_form'

import type { EventKeyType, OwnerDataType, EventsDataType, EventDataType, QuizesDataType, QuizDataType } from '../../types'

type PropsType = { owner: ?OwnerDataType }
export default ({ owner }: PropsType) => (
  <BasicTemplate>
    <h1>Settings</h1>
    {owner ? <EventList events={owner.events} quizes={owner.quizes} /> : 'イベント未登録'}
  </BasicTemplate>
)

const EventList = ({ events, quizes }: { events: EventsDataType, quizes: ?QuizesDataType }) => (
  <div>
    {_map(events, (event, eventKey) => {
      const quiz = quizes && quizes[eventKey]
      return <Event key={eventKey} {...{ eventKey, event, quiz }}/>
    })}
  </div>
)

const Event = ({ eventKey, event, quiz }: { eventKey: EventKeyType, event: EventDataType, quiz: ?QuizDataType }) => (
  <div>
    <EventForm event={event} />
    <Link to={`/${eventKey}/controller`}>
      <button>始める</button>
    </Link>
    <br/>
    <br/>
    {quiz ? <Quiz quiz={quiz} /> : 'クイズが未登録'}
  </div>
)

const Quiz = ({ quiz }: { quiz: QuizDataType }) => (
  <div>
    <QuizForm quiz={quiz} />
    <br/>
    {_map(quiz.quizContents, (quizContent, index) => (
      <QuizContentForm key={index} quizContent={quizContent} />
    ))}
  </div>
)
