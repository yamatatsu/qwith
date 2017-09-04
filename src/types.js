// @flow
export type ChoiceType = 'a' | 'b' | 'c' | 'd'

const OwnerKeyClass = class extends String {}
const EventKeyClass = class extends String {}
const MemberKeyClass = class extends String {}
export type OwnerKeyType = Class<OwnerKeyClass>
export type EventKeyType = Class<EventKeyClass>
export type MemberKeyType = Class<MemberKeyClass>

export type UserType = { uid: string, displayName: string, photoURL: string }

export type QuizContentType = {
  qText: string,
  choices: { [choice: ChoiceType]: string },
  answerChoice: ChoiceType,
}

export type QuizType = { quizTitle: string, quizContents: QuizContentType[] }
export type QuizesType = { [eventKey: EventKeyType]: QuizType }
export type EventType = { eventTitle: string }
export type EventsType = { [eventKey: EventKeyType]: EventType }
export type OwnerType = {
  events: EventsType,
  quizes?: QuizesType,
}

export type MemberType = {
  quiz: { answers: Array<?ChoiceType> },
}
export type EventStatusType = {
  quizContentIndex: number,
  quizContent: QuizContentType,
  members: { [memberKey: MemberKeyType]: MemberType },
}

export type DataType = {
  owners: { [ownerKey: OwnerKeyType]: OwnerType },
  eventStatus: { [eventKey: EventKeyType]: ?EventStatusType },
}

export type MatchType<P> = {
  params: P,
}
