// @flow
import React, { Component } from 'react'
import { setEventStatus, resetEventStatus, resetMembers, TIMESTAMP } from '../infrastructure/database'
import withUser from './observers/user_observer'
import withEventStatus from './observers/event_status_observer'
import withMembers from './observers/members_observer'
import Page from '../components/pages/controller'

import type { MatchType, EventKeyType, OwnerDataType, QuizDataType, EventStatusDataType, MembersDataType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
  owner: ?OwnerDataType,
  eventStatus: ?EventStatusDataType,
  members: ?MembersDataType,
  signOut: Function,
}
type StateType = {
  tabIndex: number,
}

class ControllerContainer extends Component<PropsType, StateType> {
  state = {
    tabIndex: 0,
  }

  changeTabIndex(tabIndex) {
    this.setState({ ...this.state, tabIndex })
  }

  render() {
    const q = query(this.props)

    if (q === 'no_owner') throw new Error("異常系として検知したい") // TODO:
    if (q === 'no_event') throw new Error("404にしたい") // TODO:
    if (q === 'no_quiz') return <div>クイズが未登録です</div>

    const { eventKey, event, quiz, eventStatus, members, signOut } = q
    const { beginQuiz, continueQuiz, finishQuiz, resetMembers } = createCommands(eventKey, quiz, eventStatus)

    return <Page {...{
      eventKey,
      event,
      quiz,
      eventStatus,
      members,
      beginQuiz,
      continueQuiz,
      finishQuiz,
      resetMembers,
      signOut,
      tabIndex: this.state.tabIndex,
      changeTabIndex: (_, tabIndex) => this.changeTabIndex(tabIndex),
    }} />
  }
}

export default withUser(withEventStatus(withMembers(ControllerContainer)))

//////////////////////////
// private

const query = (props: PropsType) => {
  const { match, owner, eventStatus, members, signOut } = props
  const { eventKey } = match.params

  if (!owner) return 'no_owner'

  const { events, quizes } = owner
  const event = events[eventKey]
  const quiz = quizes && quizes[eventKey]

  if (!event) return 'no_event'
  if (!quiz) return 'no_quiz'

  return { eventKey, event, quiz, eventStatus, members, signOut }
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
