// @flow
import React, { Component } from 'react'
import { setMember, setAnswer, TIMESTAMP } from '../infrastructure/database'
import withEvent from './observers/event_observer'
import withMember from './observers/member_observer'
import MemberForm from './member/member_form'
import Page from '../components/pages/member'

import type {
  MatchType, ChoiceType,
  OwnerKeyType, MemberKeyType, QuizContentUidType,
  EventDataType, MemberDataType,
} from '../types'

type PropsType = {
  ownerKey: OwnerKeyType,
  event: ?EventDataType,
  memberKey: MemberKeyType,
  member: ?MemberDataType,
}
type StateType = {}

class MemberContainer extends Component<PropsType, StateType> {
  render() {
    const { ownerKey, event, memberKey, member } = this.props

    if (!event) {
      return <div>no event</div>
    }
    if (!member) {
      return <MemberForm {...{ saveMember: createSaveMember(ownerKey, memberKey) }} />
    }
    if (event.status === 'not_started') {
      return <div>クイズ開始までお待ち下さい。</div>
    }

    const answer = createAnswer(ownerKey, memberKey, event.quizContent.uid)
    return <Page {...{ event, member, answer }} />
  }
}

const matchParamsToProps = (WrappedComponent) => (props: { match: MatchType<{ ownerKey: OwnerKeyType }> }) => {
  const { ownerKey } = props.match.params
  return <WrappedComponent {...props} {...{ ownerKey }} />
}

export default matchParamsToProps(withMember(withEvent(MemberContainer)))

//////////////////////
// private

const createSaveMember = (ownerKey, memberKey) => (member) => setMember(ownerKey, memberKey, member)

const createAnswer =
  (ownerKey, memberKey, quizContentUid: QuizContentUidType) =>
    (choice: ChoiceType) =>
      setAnswer(ownerKey, { quizContentUid, choice, answeredAt: TIMESTAMP, memberKey })
