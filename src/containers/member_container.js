// @flow
import React, { Component } from 'react'
import Cookies from 'js-cookie'

import { observeEventStatus, observeMember, pushMember } from '../firebase/database'
import createMember from '../domain/entities/member'
import Page from '../components/pages/member'

import type { MatchType, EventKeyType, MemberKeyType, EventStatusDataType, MemberDataType } from '../types'

const MEMBER_KEY_COOKIE_NAME = 'mk'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
}
type StateType = {
  eventStatus: ?EventStatusDataType,
  memberKey: ?MemberKeyType,
  member: ?MemberDataType,
}
class Container extends Component<PropsType, StateType> {
  componentWillMount() {
    const { eventKey } = this.props.match.params
    observeEventStatus(eventKey, (eventStatus) => {
      this.setState({ ...this.state, eventStatus })
    })

    const memberKey = Cookies.get(MEMBER_KEY_COOKIE_NAME) || pushMember(eventKey).key
    Cookies.set(MEMBER_KEY_COOKIE_NAME, memberKey, { expires: 30 })
    this.setState({ ...this.state, memberKey })

    observeMember(eventKey, memberKey, (member) => {
      this.setState({ ...this.state, member })
    })
  }

  render() {
    const { eventKey } = this.props.match.params
    const { eventStatus: eventStatusData, memberKey, member: memberData } = this.state

    const member = createMember(eventKey, memberKey, eventStatusData, memberData)

    if (member === 'has_no_member_key') return null // TODO クルクル
    if (member === 'has_no_event_status') {
      return <div>クイズ開始までお待ち下さい。</div>
    }

    const { eventStatus, myAnswer, answer } = member

    return <Page {...{ eventStatus, myAnswer, answer }} />
  }
}

export default Container
