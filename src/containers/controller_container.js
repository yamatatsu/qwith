// @flow
import React from 'react'
import _get from 'lodash/get'

import { setEventStatusQuizKey, setEventStatusQuizContentIndex } from '../firebase/database'
import Page from '../components/pages/controller'

import type { MatchType, UserType, OwnerType, EventType, QuizesType, EventStatusType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: string }>,
  user: UserType,
  owner: ?OwnerType,
}

const Container = (props: PropsType) => {
  const ownerKey = props.user.uid
  const { eventKey } = props.match.params
  const event: ?EventType = _get(props.owner, `events.${eventKey}`)
  const quizes: ?QuizesType = _get(props.owner, 'quizes')
  const eventStatus: ?EventStatusType = _get(props.owner, 'eventStatus')

  if (!event) return null // TODO: クルクル

  const startQuiz = (quizKey) => setEventStatusQuizKey(ownerKey, eventKey, quizKey)
  const nextQuizContent = () => setEventStatusQuizContentIndex(ownerKey, _get(eventStatus, 'quizContentIndex') + 1)

  return <Page {...{ event, quizes, eventStatus, startQuiz, nextQuizContent }}  />
}

export default Container
