// @flow
import React, { Component } from 'react'
import _get from 'lodash/get'

import { observeAuth } from '../firebase/auth'
import { observeOwner, observeEventStatus } from '../firebase/database'
import createOwner from '../domain/entities/owner'
import createEventStatus from '../domain/entities/eventStatus'
import { EventFacilitator, QuizeFacilitator } from '../components/pages/controller'

import type { EventKeyType, MatchType, OwnerDataType, EventStatusDataType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
}
type StateType = {
  owner: ?OwnerDataType,
  eventStatus: ?EventStatusDataType,
}

class Container extends Component<PropsType, StateType> {
  state = {
    owner: null,
    eventStatus: null,
  }

  componentWillMount() {
    observeAuth(_user => {
      const ownerKey = _get(_user, 'uid')

      observeOwner(ownerKey, (owner) => {
        this.setState({ ...this.state, owner })
      })
    })

    const { eventKey } = this.props.match.params
    observeEventStatus(eventKey, (eventStatus) => {
      this.setState({ ...this.state, eventStatus })
    })
  }

  render() {
    const { eventKey } = this.props.match.params
    const { owner: ownerData, eventStatus: eventStatusData } = this.state

    const owner = createOwner(eventKey, ownerData)
    const eventStatus = createEventStatus(eventStatusData)

    if (owner === 'has_no_owner') return null // TODO: クルクル
    if (owner === 'has_no_event') throw new Error("404にしたい") // TODO:
    if (owner === 'has_no_quiz') return <div>クイズが未登録です</div>

    const { event, quiz, startQuiz, continueQuiz } = owner

    if (eventStatus === 'not_started') {
      return <EventFacilitator {...{ event, quiz, startQuiz }} />
    }

    const { quizContent } = eventStatus

    return <QuizeFacilitator {...{ event, quizContent, continueQuiz: () => continueQuiz(eventStatus) }}  />
  }
}

export default Container
