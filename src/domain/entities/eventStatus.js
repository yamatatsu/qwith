// @flow
import type { EventStatusDataType, QuizContentDataType } from '../../types'

export type EventStatusType = {|
  quizContentIndex: number,
  quizContent: QuizContentDataType,
  quizContentIndexMax: number,
  hasNoNext: boolean,
  nextQuizContentIndex: number,
  quizContentStartAt: number,
|}
export default (eventStatus: ?EventStatusDataType): EventStatusType | 'not_started' => {
  if (!eventStatus) return 'not_started'
  const { quizContentIndex, quizContent, quizContentIndexMax, quizContentStartAt } = eventStatus

  const hasNoNext = quizContentIndexMax === quizContentIndex

  return {
    quizContentIndex,
    quizContent,
    quizContentIndexMax,
    quizContentStartAt,
    hasNoNext,
    nextQuizContentIndex: quizContentIndex + 1,
  }
}
