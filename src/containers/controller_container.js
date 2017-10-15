// @flow
import React, { Component } from 'react'
import { setEvent, resetEvent, TIMESTAMP } from '../infrastructure/database'
import withUser from './observers/user_observer'
import withEvent from './observers/event_observer'
import Page from '../components/pages/controller'

import type { OwnerKeyType, UserType, EventDataType } from '../types'

type PropsType = {
  ownerKey: OwnerKeyType,
  user: UserType,
  event: ?EventDataType,
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
    const { ownerKey, event, signOut } = this.props

    if (!event) return <div>イベント初期化中</div> // TODO: くるくる

    const { beginQuiz, continueQuiz, finishQuiz } = createCommands(ownerKey, event)

    return <Page {...{
      ownerKey,
      event,
      beginQuiz,
      continueQuiz,
      finishQuiz,
      signOut,
      tabIndex: this.state.tabIndex,
      changeTabIndex: (_, tabIndex) => this.changeTabIndex(tabIndex),
    }} />
  }
}

export default withUser(withEvent(ControllerContainer))

//////////////////////////
// private

const createCommands = (ownerKey: OwnerKeyType, event: EventDataType) => {
  const changeQuiz = (index: number) => {
    setEvent(ownerKey, {
      ...event,
      status: 'on',
      quizContentIndex: index,
      quizContent: event.quiz.quizContents[index],
      quizContentStartAt: TIMESTAMP,
    })
  }

  const nextQuizContentIndex = event ? event.quizContentIndex + 1 : 1

  return {
    beginQuiz: () => changeQuiz(0),
    continueQuiz: () => changeQuiz(nextQuizContentIndex),
    finishQuiz: () => resetEvent(ownerKey),
  }
}
