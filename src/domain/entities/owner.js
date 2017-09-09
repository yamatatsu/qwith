// @flow
import { setEventStatus, resetEventStatus, resetMembers } from '../../infrastructure/database'

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

type ReturnType = OwnerType | 'has_no_owner' | 'has_no_event' | 'has_no_quiz' | 'has_no_quiz_contents'

export default (eventKey: EventKeyType, owner: ?OwnerDataType): ReturnType => {
  if (!owner) return 'has_no_owner'

  const { events, quizes, quizContents: quizContentsObj } = owner
  const event = events[eventKey]
  const quiz = quizes && quizes[eventKey]
  const quizContents = quizContentsObj && quizContentsObj[eventKey]

  if (!event) return 'has_no_event'
  if (!quiz) return 'has_no_quiz'
  if (!quizContents) return 'has_no_quiz_contents'

  const changeQuiz = (index: number) => {
    setEventStatus(eventKey, {
      quizContentIndex: index,
      quizContent: quizContents[index],
      quizContentIndexMax: quizContents.length,
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
