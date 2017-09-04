// @flow
export type ChoiceType = 'a' | 'b' | 'c' | 'd'

const OwnerKeyClass = class extends String {}
const EventKeyClass = class extends String {}
const MemberKeyClass = class extends String {}
export type OwnerKeyType = Class<OwnerKeyClass>
export type EventKeyType = Class<EventKeyClass>
export type MemberKeyType = Class<MemberKeyClass>

export type UserType = { uid: string, displayName: string, photoURL: string }

export type QuizContentDataType = {
  qText: string,
  choices: { [choice: ChoiceType]: string },
  answerChoice: ChoiceType,
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
  quiz: { answers: Array<?ChoiceType> },
}
export type EventStatusDataType = {
  quizContentIndex: number,
  quizContent: QuizContentDataType,
  members?: { [memberKey: MemberKeyType]: MemberDataType },
}

export type DataType = {
  owners: { [ownerKey: OwnerKeyType]: OwnerDataType },
  eventStatus: { [eventKey: EventKeyType]: ?EventStatusDataType },
}

export type MatchType<P> = {
  params: P,
}
