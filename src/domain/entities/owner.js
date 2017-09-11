// @flow
import { setEventStatus, resetEventStatus, resetMembers, TIMESTAMP } from '../../infrastructure/database'

import type { EventKeyType, OwnerDataType, EventDataType, QuizDataType } from '../../types'
import type { EventStatusType } from './eventStatus'

export type OwnerType = {|
  eventKey: EventKeyType,
  event: EventDataType,
  quiz: QuizDataType,
  beginQuiz: () => void,
  continueQuiz: (eventStatus: EventStatusType) => void,
  finishQuiz: () => void,
  resetMembers: () => void,
|}

type ReturnType = OwnerType | 'has_no_owner' | 'has_no_event' | 'has_no_quiz'

export default (eventKey: EventKeyType, owner: ?OwnerDataType): ReturnType => {
  if (!owner) return 'has_no_owner'

  const { events, quizes } = owner
  const event = events[eventKey]
  const quiz = quizes && quizes[eventKey]

  if (!event) return 'has_no_event'
  if (!quiz) return 'has_no_quiz'

  const changeQuiz = (index: number) => {
    setEventStatus(eventKey, {
      quizContentIndex: index,
      quizContent: quiz.quizContents[index],
      quizContentIndexMax: quiz.quizContents.length,
      quizContentStartAt: TIMESTAMP,
    })
  }

  return {
    eventKey,
    event,
    quiz,
    beginQuiz: () => changeQuiz(0),
    continueQuiz: (eventStatus: EventStatusType) => {
      if (!eventStatus.hasNoNext) {
        changeQuiz(eventStatus.nextQuizContentIndex)
      }
    },
    finishQuiz: () => resetEventStatus(eventKey),
    resetMembers: () => resetMembers(eventKey),
  }
}
