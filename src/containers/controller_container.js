// @flow
import React, { Component } from 'react'
import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'
import withUser from './observers/user_observer'
import withEventStatus from './observers/event_status_observer'
import withMembers from './observers/members_observer'
import createOwner from '../domain/entities/owner'
import createEventStatus from '../domain/entities/eventStatus'
import { EventFacilitator, QuizeFacilitator } from '../components/pages/controller'

import type { MatchType, EventKeyType, OwnerDataType, EventStatusDataType, MembersDataType, MemberDataType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
  owner: ?OwnerDataType,
  eventStatus: ?EventStatusDataType,
  members: ?MembersDataType,
}
type StateType = {}

class ControllerContainer extends Component<PropsType, StateType> {
  render() {
    const { match, owner: ownerData, eventStatus: eventStatusData, members: membersData } = this.props
    const { eventKey } = match.params

    const owner = createOwner(eventKey, ownerData)
    const eventStatus = createEventStatus(eventStatusData)

    if (owner === 'has_no_owner') throw new Error("異常系として検知したい") // TODO:
    if (owner === 'has_no_event') throw new Error("404にしたい") // TODO:
    if (owner === 'has_no_quiz') return <div>クイズが未登録です</div>

    if (eventStatus === 'not_started') {
      return <EventFacilitator {...{ owner }} />
    }

    const members = _sortBy(
      _map(membersData, (m: MemberDataType, k) => ({
        nickname: m.nickname,
        time: m.quiz && m.quiz.answers[eventStatus.quizContentIndex] && (m.quiz.answers[eventStatus.quizContentIndex].answeredAt - eventStatus.quizContentStartAt) / 1000
      })),
      'time',
    )

    return <QuizeFacilitator {...{ owner, eventStatus, members }} />
  }
}

export default withUser(withEventStatus(withMembers(ControllerContainer)))
