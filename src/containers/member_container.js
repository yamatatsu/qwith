// @flow
import React, { Component } from 'react'
import { setMember } from '../infrastructure/database'
import withEventStatus from './observers/event_status_observer'
import withMember from './observers/member_observer'
import createMember from '../domain/entities/member'
import MemberForm from './member/member_form'
import Page from '../components/pages/member'

import type { MatchType, EventKeyType, MemberKeyType, EventStatusDataType, MemberDataType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
  eventStatus: ?EventStatusDataType,
  memberKey: MemberKeyType,
  member: ?MemberDataType,
}
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const { match, eventStatus: eventStatusData, memberKey, member: memberData } = this.props
    const { eventKey } = match.params

    const member = createMember(eventKey, memberKey, eventStatusData, memberData)

    if (member === 'has_no_nickname') {
      return <MemberForm {...{ saveMember: (member) => setMember(eventKey, memberKey, member) }} />
    }
    if (member === 'has_no_event_status') {
      return <div>クイズ開始までお待ち下さい。</div>
    }

    return <Page {...{ member }} />
  }
}

export default withEventStatus(withMember(Container))
