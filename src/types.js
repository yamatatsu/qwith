// @flow
export type ChoiceType = 'a' | 'b' | 'c' | 'd'

const OwnerKeyClass = class extends String {}
const EventKeyClass = class extends String {}
const MemberKeyClass = class extends String {}
const QuizContentUidClass = class extends String {}
export type OwnerKeyType = Class<OwnerKeyClass>
export type EventKeyType = Class<EventKeyClass>
export type MemberKeyType = Class<MemberKeyClass>
export type QuizContentUidType = Class<QuizContentUidClass>

export type UserType = { uid: string, displayName: string, photoURL: string }

export type QuizContentDataType = {
  qText: string,
  choices: { [choice: ChoiceType]: string },
  answerChoice: ChoiceType,
  uid: QuizContentUidType,
}

export type QuizDataType = { quizTitle: string, quizContents: QuizContentDataType[] }
export type QuizesDataType = { [eventKey: EventKeyType]: QuizDataType }
export type EventDataType = { eventTitle: string }
export type EventsDataType = { [eventKey: EventKeyType]: EventDataType }
export type OwnerDataType = {
  events: EventsDataType,
  quizes?: QuizesDataType,
}

export type MemberDataType = {
  quiz: { answers: { [key: number]: ChoiceType } },
}
export type EventStatusDataType = {
  quizContentIndex: number,
  quizContent: QuizContentDataType,
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
