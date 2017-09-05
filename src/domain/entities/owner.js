// @flow
import { setEventStatus, resetEventStatus, resetMembers } from '../../infrastructure/database'

import type { EventKeyType, OwnerDataType, EventDataType, QuizDataType } from '../../types'
import type { EventStatusType } from './eventStatus'

export type OwnerType = {|
  event: EventDataType,
  quiz: QuizDataType,
  beginQuiz: () => void,
  continueQuiz: (eventStatus: EventStatusType) => void,
  finishQuiz: () => void,
  resetMembers: () => void,
|}

type ReturnType = OwnerType | 'has_no_event' | 'has_no_quiz' | 'has_no_owner'

export default (eventKey: EventKeyType, owner: ?OwnerDataType): ReturnType => {
  if (!owner) return 'has_no_owner'

  const { events, quizes } = owner
  const event = events[eventKey]
  const quiz = quizes && quizes[eventKey]

  if (!event) return 'has_no_event'
  if (!quiz) return 'has_no_quiz'

  const changeQuiz = (index: ?number) => {
    if (!index) throw new Error('no next quiz content')
    setEventStatus(eventKey, {
      quizContentIndex: index,
      quizContent: quiz.quizContents[index],
      quizContentIndexMax: quiz.quizContents.length,
    })
  }

  return {
    event,
    quiz,
    beginQuiz: () => changeQuiz(0),
    continueQuiz: (eventStatus: EventStatusType) => changeQuiz(eventStatus.nextQuizContentIndex),
    finishQuiz: () => resetEventStatus(eventKey),
    resetMembers: () => resetMembers(eventKey),
  }
}
