// @flow
import React, { Component } from 'react'
import { setEvent, setQuiz } from '../infrastructure/database'
import withUser from './observers/user_observer'
import Page from '../components/pages/settings'

import type { EventKeyType, UserType, OwnerDataType, EventDataType, QuizDataType } from '../types'

type PropsType = { user: UserType, owner: ?OwnerDataType }
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const { user, owner } = this.props
    const { uid: ownerKey } = user

    const saveEvent = (eventKey: EventKeyType) => (event: EventDataType) => {
      setEvent(ownerKey, eventKey, event)
    }
    const saveQuiz = (eventKey: EventKeyType) => (quiz: QuizDataType) => {
      setQuiz(ownerKey, eventKey, quiz)
    }

    return <Page {...{ owner, saveEvent, saveQuiz }} />
  }
}

export default withUser(Container)
