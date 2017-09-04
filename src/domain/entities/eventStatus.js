// @flow
import type { EventStatusDataType, QuizContentDataType } from '../../types'

export type EventStatusType = {|
  quizContentIndex: number,
  quizContent: QuizContentDataType,
  nextQuizContentIndex: number,
|}
export default (eventStatus: ?EventStatusDataType): EventStatusType | 'not_started' => {
  if (!eventStatus) return 'not_started'
  const { quizContentIndex, quizContent } = eventStatus

  return {
    quizContentIndex,
    quizContent,
    nextQuizContentIndex: quizContentIndex + 1
  }
}
