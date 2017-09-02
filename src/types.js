// @flow
export type ChoiceType = 'a' | 'b' | 'c' | 'd'

export type UserType = { uid: string, displayName: string, photoURL: string }

export type QuizContentType = {
  quizContentUid: string,
  qText: string,
  choices: { [choice: ChoiceType]: string },
  answerChoice: ChoiceType,
}
export type QuizType = { quizTitle: string, quizContents: QuizContentType[] }
export type QuizesType = { [quizKey: string]: QuizType }
export type EventType = { eventTitle: string, quizKeys: string[] }
export type EventsType = { [eventKey: string]: EventType }
export type EventStatusType = {
  eventKey: string,
  quizKey: string,
  quizContentIndex: number,
  members: { [memberKey: string]: boolean },
}
export type OwnerType = {
  events?: EventsType,
  quizes: QuizesType,
  eventStatus: ?EventStatusType,
}

export type AnswersType = {
  [quizKey: string]: Array<?ChoiceType>,
}
export type EventMemberType = {
  answers: AnswersType,
}
export type DataType = {
  owners: { [ownerKey: string]: OwnerType },
  eventMembers: {
    [eventKey: string]: {
      [memberKey: string]: EventMemberType,
    },
  },
}

export type MatchType<P> = {
  params: P,
}
