// @flow
import React from 'react'
import withUser from './observers/user_observer'
import withEventStatus from './observers/event_status_observer'
import withMembers from './observers/members_observer'
import { QR } from '../components/pages/screen'

import type { MatchType, EventKeyType, OwnerDataType, EventStatusDataType, MembersDataType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
  owner: ?OwnerDataType,
  eventStatus: ?EventStatusDataType,
  members: ?MembersDataType,
}

const ControllerContainer = (props: PropsType) => {
  const q = query(props)

  if (q === 'no_owner') throw new Error("異常系として検知したい") // TODO:
  if (q === 'no_event') throw new Error("異常系として検知したい") // TODO:
  if (q === 'no_quiz') throw new Error("異常系として検知したい") // TODO:

  const { eventKey, event, quiz, eventStatus, members } = q

  if (!eventStatus) {
    return <QR {...{ eventKey }} />
  }

  return false // TODO: 未実装
}

export default withUser(withEventStatus(withMembers(ControllerContainer)))

//////////////////////////
// private

const query = (props: PropsType) => {
  const { match, owner, eventStatus, members } = props
  const { eventKey } = match.params

  if (!owner) return 'no_owner'

  const { events, quizes } = owner
  const event = events[eventKey]
  const quiz = quizes && quizes[eventKey]

  if (!event) return 'no_event'
  if (!quiz) return 'no_quiz'

  return { eventKey, event, quiz, eventStatus, members }
}
