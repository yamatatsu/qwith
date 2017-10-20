// @flow
import type { OwnerKeyType, QuizKeyType, MemberKeyType, QuizContentUidType, AnswerKeyType } from './keys'
export type { OwnerKeyType, QuizKeyType, MemberKeyType, QuizContentUidType, AnswerKeyType }

export type ChoiceType = 'a' | 'b' | 'c' | 'd'
export type EventStatusType = 'no_quiz_started' | 'on' | 'off' | 'finish'

export type UserType = { uid: OwnerKeyType, displayName: string, photoURL: string }


export type QuizContentDataType = {
  qText: string,
  [choice: ChoiceType]: string,
  correctChoice: ChoiceType,
  uid: QuizContentUidType,
}
export type QuizDataType = { quizTitle: string, quizContents: QuizContentDataType[] }
export type QuizesDataType = { [quizKey: QuizKeyType]: QuizDataType }

export type MemberDataType = { nickname: ?string }
export type MembersDataType = { [memberKey: MemberKeyType]: MemberDataType }

export type AnswerDataType = {
  quizContentUid: QuizContentUidType,
  choice: ChoiceType,
  answeredAt: number,
  memberKey: MemberKeyType,
}
export type AnswersDataType = { [answerKey: AnswerKeyType]: AnswerDataType }

export type EventDataType = {
  status: EventStatusType,
  quizKey: QuizKeyType,
  quizContentIndex: number,
  quiz: QuizDataType,
  quizContent: QuizContentDataType,
  quizContentIndexMax: number,
  quizContentStartAt: ?number,
}

export type OwnerDataType = {|
  event: ?EventDataType,
  // quizes: QuizesDataType,
  // members: ?MembersDataType,
  // answers: ?AnswersDataType,
|}

export type MatchType<P> = {
  params: P,
}
