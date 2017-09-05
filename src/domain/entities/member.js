// @flow
import { setAnswer } from '../../infrastructure/database'

import type { EventStatusDataType, MemberKeyType, MemberDataType, EventKeyType, ChoiceType } from '../../types'

export type MemberType = {|
  eventStatus: EventStatusDataType,
  myAnswer: ?ChoiceType,
  answer: (choice: ChoiceType) => void,
|}

type ReturnType = MemberType | 'has_no_member_key' | 'has_no_event_status'

export default (eventKey: EventKeyType, memberKey: MemberKeyType, eventStatus: ?EventStatusDataType, member: ?MemberDataType): ReturnType => {
  if (!memberKey) return 'has_no_member_key'
  const _memberKey = (memberKey: MemberKeyType)
  if (!eventStatus) return 'has_no_event_status'

  const { quizContentIndex } = eventStatus

  const myAnswer = member && member.quiz.answers[quizContentIndex]

  return {
    eventStatus,
    myAnswer,
    answer: (choice: ChoiceType) => setAnswer(eventKey, _memberKey, quizContentIndex, choice),
  }
}
