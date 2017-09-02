// @flow
import React from 'react'
import _get from 'lodash/get'

import { setEventStatusQuizKey } from '../firebase/database'
import Page from '../components/pages/controller'

import type { MatchType, UserType, OwnerType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: string }>,
  user: UserType,
  owner: ?OwnerType,
}

const Container = (props: PropsType) => {
  const ownerKey = props.user.uid
  const { eventKey } = props.match.params
  const event = _get(props.owner, ['events', eventKey])
  if (!event) return null // TODO: クルクル

  const startQuiz = (quizKey) => setEventStatusQuizKey(ownerKey, eventKey, quizKey)

  return <Page {...{ eventKey, event, startQuiz }}  />
}

export default Container
