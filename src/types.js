// @flow
export type ChoiceType = 'a' | 'b' | 'c' | 'd'

export type UserType = { uid: string, displayName: string, photoURL: string }

export type QuizContentType = {
  qText: string,
  choices: { [choice: ChoiceType]: string },
  answerChoice: ChoiceType,
}
export type QuizType = { quizTitle: string, quizContents: QuizContentType[] }
export type QuizesType = { [quizKey: string]: QuizType }
export type EventType = { eventTitle: string, quizKeys: string[] }
export type EventsType = { [eventKey: string]: EventType }
export type OwnerType = {
  events: EventsType,
  quizes?: QuizesType,
}

export type AnswersType = {
  [quizKey: string]: Array<?ChoiceType>,
}
export type MemberType = {
  answers: AnswersType,
}
export type EventStatusType = {
  quizKey: string,
  quizContentIndex: number,
  quizContent: QuizContentType,
  members: { [memberKey: string]: MemberType },
}

export type DataType = {
  owners: { [ownerKey: string]: OwnerType },
  eventStatus: { [eventKey: string]: ?EventStatusType },
}

export type MatchType<P> = {
  params: P,
}
