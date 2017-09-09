// @flow
import React, { Component } from 'react'

import withUser from './observers/user_observer'
import withEventStatus from './observers/event_status_observer'
import createOwner from '../domain/entities/owner'
import createEventStatus from '../domain/entities/eventStatus'
import { EventFacilitator, QuizeFacilitator } from '../components/pages/controller'

import type { MatchType, EventKeyType, OwnerDataType, EventStatusDataType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
  owner: ?OwnerDataType,
  eventStatus: ?EventStatusDataType,
}
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const { match, owner: ownerData, eventStatus: eventStatusData } = this.props
    const { eventKey } = match.params

    const owner = createOwner(eventKey, ownerData)
    const eventStatus = createEventStatus(eventStatusData)

    if (owner === 'has_no_owner') throw new Error("異常系として検知したい") // TODO:
    if (owner === 'has_no_event') throw new Error("404にしたい") // TODO:
    if (owner === 'has_no_quiz') return <div>クイズが未登録です</div>
    if (owner === 'has_no_quiz_contents') return <div>クイズが未登録です</div>

    if (eventStatus === 'not_started') {
      return <EventFacilitator {...{ owner }} />
    }
    return <QuizeFacilitator {...{ owner, eventStatus }} />
  }
}

export default withUser(withEventStatus(Container))
