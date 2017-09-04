// @flow
import { updateEventStatus } from '../../firebase/database'

import type { EventKeyType, OwnerDataType, EventDataType, QuizDataType } from '../../types'
import type { EventStatusType } from './eventStatus'

export type OwnerType = {|
  event: EventDataType,
  quiz: QuizDataType,
  startQuiz: () => void,
  continueQuiz: (eventStatus: EventStatusType) => void,
|}

type ReturnType = OwnerType | 'has_no_event' | 'has_no_quiz' | 'has_no_owner'

export default (eventKey: EventKeyType, owner: ?OwnerDataType): ReturnType => {
  if (!owner) return 'has_no_owner'

  const { events, quizes } = owner
  const event = events[eventKey]
  const quiz = quizes && quizes[eventKey]

  if (!event) return 'has_no_event'
  if (!quiz) return 'has_no_quiz'

  const changeQuiz = (index: number) => {
    updateEventStatus(eventKey, { quizContentIndex: index, quizContent: quiz.quizContents[index]})
  }

  return {
    event,
    quiz,
    startQuiz: () => changeQuiz(0),
    continueQuiz: (eventStatus: EventStatusType) => changeQuiz(eventStatus.nextQuizContentIndex),
  }
}
