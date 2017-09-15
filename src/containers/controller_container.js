// @flow
import React from 'react'
import { setEventStatus, resetEventStatus, resetMembers, TIMESTAMP } from '../infrastructure/database'
import withUser from './observers/user_observer'
import withEventStatus from './observers/event_status_observer'
import withMembers from './observers/members_observer'
import { EventFacilitator, QuizeFacilitator } from '../components/pages/controller'

import type { MatchType, EventKeyType, OwnerDataType, QuizDataType, EventStatusDataType, MembersDataType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
  owner: ?OwnerDataType,
  eventStatus: ?EventStatusDataType,
  members: ?MembersDataType,
}

const ControllerContainer = (props: PropsType) => {
  const q = query(props)

  if (q === 'no_owner') throw new Error("異常系として検知したい") // TODO:
  if (q === 'no_event') throw new Error("404にしたい") // TODO:
  if (q === 'no_quiz') return <div>クイズが未登録です</div>

  const { eventKey, event, quiz, eventStatus, members } = q
  const { beginQuiz, continueQuiz, finishQuiz, resetMembers } = createCommands(eventKey, quiz, eventStatus)

  if (!eventStatus) {
    return <EventFacilitator {...{ eventKey, event, quiz, beginQuiz }} />
  }

  return <QuizeFacilitator {...{ event, eventStatus, members, continueQuiz, finishQuiz, resetMembers }} />
}

export default withUser(withEventStatus(withMembers(ControllerContainer)))

//////////////////////////
// private

const query = (props: PropsType) => {
  const { match, owner, eventStatus, members } = props
  const { eventKey } = match.params

  if (!owner) return 'no_owner'

  const { events, quizes } = owner
  const event = events[eventKey]
  const quiz = quizes && quizes[eventKey]

  if (!event) return 'no_event'
  if (!quiz) return 'no_quiz'

  return { eventKey, event, quiz, eventStatus, members }
}

const createCommands = (eventKey: EventKeyType, quiz: QuizDataType, eventStatus: ?EventStatusDataType) => {
  const changeQuiz = (index: number) => {
    setEventStatus(eventKey, {
      quizContentIndex: index,
      quizContent: quiz.quizContents[index],
      quizContentIndexMax: quiz.quizContents.length - 1,
      quizContentStartAt: TIMESTAMP,
    })
  }

  const nextQuizContentIndex = eventStatus ? eventStatus.quizContentIndex + 1 : 1

  return {
    beginQuiz: () => changeQuiz(0),
    continueQuiz: () => changeQuiz(nextQuizContentIndex),
    finishQuiz: () => resetEventStatus(eventKey),
    resetMembers: () => resetMembers(eventKey),
  }
}
