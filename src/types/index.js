// @flow
import type { OwnerKeyType, EventKeyType, MemberKeyType, QuizContentUidType } from './keys'
export type { OwnerKeyType, EventKeyType, MemberKeyType, QuizContentUidType }

export type ChoiceType = 'a' | 'b' | 'c' | 'd'

export type UserType = { uid: OwnerKeyType, displayName: string, photoURL: string }


export type EventDataType = { eventTitle: string }
export type EventsDataType = { [eventKey: EventKeyType]: EventDataType }
export type QuizContentDataType = {
  qText: string,
  [choice: ChoiceType]: string,
  answerChoice: ChoiceType,
  uid: QuizContentUidType,
}
export type QuizDataType = { quizTitle: string, quizContents: QuizContentDataType[] }
export type QuizesDataType = { [eventKey: EventKeyType]: QuizDataType }
export type OwnerDataType = {|
  events: EventsDataType,
  quizes?: QuizesDataType,
|}

export type AnswerDataType = { choice: ChoiceType, answeredAt: number }
export type AnswersDataType = { [key: number]: AnswerDataType }
export type MemberDataType = {
  nickname: ?string,
  quiz: { answers: AnswersDataType },
}
export type EventStatusDataType = {
  quizContentIndex: number,
  quizContent: QuizContentDataType,
  quizContentIndexMax: number,
  quizContentStartAt: number,
}

export type DataType = {
  owners: { [ownerKey: OwnerKeyType]: OwnerDataType },
  eventStatus: { [eventKey: EventKeyType]: EventStatusDataType },
  members: {
    [eventKey: EventKeyType]: {
      [memberKey: MemberKeyType]: MemberDataType,
    },
  },
}

export type MatchType<P> = {
  params: P,
}
