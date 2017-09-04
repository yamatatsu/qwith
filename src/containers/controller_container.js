// @flow
import React, { Component } from 'react'
import _get from 'lodash/get'

import { observeAuth } from '../firebase/auth'
import { observeOwner, observeEventStatus } from '../firebase/database'

import { setEventStatusQuiz } from '../firebase/database'
import { EventFacilitator, QuizeFacilitator } from '../components/pages/controller'

import type { EventKeyType, MatchType, OwnerType, EventType, QuizType, EventStatusType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: EventKeyType }>,
}
type StateType = {
  owner: ?OwnerType,
  eventStatus: ?EventStatusType,
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
    const { owner, eventStatus } = this.state

    if (!owner) return null // TODO: クルクル

    const { events, quizes } = owner

    const event: ?EventType = events[eventKey]

    if (!event) throw new Error("404にしたい") // TODO:

    if (!quizes) return <div>クイズが未登録</div>
    const quiz: ?QuizType = quizes[eventKey]
    if (!quiz) return <div>クイズが未登録です</div>

    const startQuiz = () => setEventStatusQuiz(eventKey, 0, quiz.quizContents[0])
    if (!eventStatus) {
      return <EventFacilitator {...{event, quiz, startQuiz}} />
    }

    const { quizContentIndex } = eventStatus

    const nextQuizContent = () => {
      const nextQuizContentIndex = quizContentIndex + 1
      setEventStatusQuiz(eventKey, nextQuizContentIndex, quiz.quizContents[nextQuizContentIndex])
    }

    return <QuizeFacilitator {...{ event, eventStatus, nextQuizContent }}  />
  }
}

export default Container
