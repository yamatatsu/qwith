// @flow
import React, { Component } from 'react'
import { setEvent, addEvent, setQuiz } from '../infrastructure/database'
import withUser from './observers/user_observer'
import Page from '../components/pages/settings'

import type { EventKeyType, UserType, OwnerDataType, EventDataType, QuizDataType } from '../types'

type PropsType = { user: UserType, owner: ?OwnerDataType }
type StateType = { isOpenNewEvent: boolean }

class Container extends Component<PropsType, StateType> {
  state = { isOpenNewEvent: false }

  openNewEvent() { this.setState({ ...this.state, isOpenNewEvent: true }) }
  closeNewEvent() { this.setState({ ...this.state, isOpenNewEvent: false }) }

  render() {
    const { user, owner } = this.props
    const { uid: ownerKey } = user
    const { isOpenNewEvent } = this.state

    const saveEvent = (eventKey: EventKeyType) => (event: EventDataType) => {
      setEvent(ownerKey, eventKey, event)
      this.closeNewEvent()
    }
    const createEvent = () => (event: EventDataType) => {
      addEvent(ownerKey, event)
    }
    const saveQuiz = (eventKey: EventKeyType) => (quiz: QuizDataType) => {
      setQuiz(ownerKey, eventKey, quiz)
    }

    return <Page {...{
      owner, isOpenNewEvent, saveEvent, createEvent, saveQuiz,
      openNewEvent: () => this.openNewEvent()
    }} />
  }
}

export default withUser(Container)
