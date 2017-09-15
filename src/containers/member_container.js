// @flow
import React from 'react'
import { setMember, setAnswer, TIMESTAMP } from '../infrastructure/database'
import withEventStatus from './observers/event_status_observer'
import withMember from './observers/member_observer'
import MemberForm from './member/member_form'
import Page from '../components/pages/member'

import type { MatchType, EventKeyType, MemberKeyType, EventStatusDataType, MemberDataType, ChoiceType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
  eventStatus: ?EventStatusDataType,
  memberKey: MemberKeyType,
  member: ?MemberDataType,
}

const MemberContainer = (props: PropsType) => {
  const q = query(props)

  if (q === 'no_member') {
    return <MemberForm {...{ saveMember: createSaveMember(props) }} />
  }
  if (q ==='not_started') {
    return <div>クイズ開始までお待ち下さい。</div>
  }

  const { eventKey, memberKey, member, eventStatus, myAnswer } = q
  const answer = createAnswer(eventKey, memberKey, eventStatus.quizContentIndex)
  return <Page {...{ member, eventStatus, myAnswer, answer }} />
}

export default withEventStatus(withMember(MemberContainer))

//////////////////////
// private

const query = (props: PropsType) => {
  const { match, memberKey, eventStatus, member } = props

  if (!member) return 'no_member'
  if (!eventStatus) return 'not_started'

  const { quizContentIndex } = eventStatus
  const myAnswer = member && member.quiz && member.quiz.answers[quizContentIndex] && member.quiz.answers[quizContentIndex].choice

  const { eventKey } = match.params
  return { eventKey, memberKey, member, eventStatus, myAnswer }
}

const createSaveMember = (props: PropsType) => {
  const { match, memberKey } = props
  const { eventKey } = match.params
  return (member) => setMember(eventKey, memberKey, member)
}

const createAnswer =
  (eventKey, memberKey, quizContentIndex) =>
    (choice: ChoiceType) =>
      setAnswer(eventKey, memberKey, quizContentIndex, { choice, answeredAt: TIMESTAMP })
