// @flow
export type ChoiceType = 'a' | 'b' | 'c' | 'd'

export opaque type OwnerKeyType: string = string
export opaque type EventKeyType: string = string
export opaque type MemberKeyType: string = string
export opaque type QuizContentUidType: string = string

export type UserType = { uid: OwnerKeyType, displayName: string, photoURL: string }

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
  quizContentIndexMax: number,
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
