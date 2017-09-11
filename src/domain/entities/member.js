// @flow
import { setAnswer } from '../../infrastructure/database'

import type { EventStatusDataType, MemberKeyType, MemberDataType, EventKeyType, ChoiceType } from '../../types'

export type MemberType = {|
  nickname: string,
  eventStatus: EventStatusDataType,
  myAnswer: ?ChoiceType,
  answer: (choice: ChoiceType) => void,
|}

type ReturnType = MemberType | 'has_no_event_status' | 'has_no_nickname'

export default (eventKey: EventKeyType, memberKey: MemberKeyType, eventStatus: ?EventStatusDataType, member: ?MemberDataType): ReturnType => {
  const nickname = member && member.nickname
  if (!nickname) return 'has_no_nickname'

  if (!eventStatus) return 'has_no_event_status'
  const { quizContentIndex } = eventStatus
  const myAnswer = member && member.quiz && member.quiz.answers[quizContentIndex]

  return {
    nickname,
    eventStatus,
    myAnswer,
    answer: (choice: ChoiceType) => setAnswer(eventKey, memberKey, quizContentIndex, choice),
  }
}
