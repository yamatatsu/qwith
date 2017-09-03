// @flow
import React, { Component } from 'react'
import _get from 'lodash/get'

import { observeAuth } from '../firebase/auth'
import { observeOwner, observeEventStatus } from '../firebase/database'

import { setEventStatusQuiz, setEventStatusQuizContent } from '../firebase/database'
import { QuizeSelecter, QuizeFacilitator } from '../components/pages/controller'

import type { MatchType, OwnerType, EventStatusType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: string }>,
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
    const event = events[eventKey]

    if (!quizes || !event.quizKeys) return <div>クイズが未登録</div>

    const startQuiz = (quizKey) => setEventStatusQuiz(eventKey, quizKey, quizes[quizKey].quizContents[0])
    if (!eventStatus) {
      return <QuizeSelecter {...{quizes, event, startQuiz}} />
    }

    const { quizKey, quizContentIndex } = eventStatus

    const nextQuizContent = () => {
      const nextQuizContentIndex = quizContentIndex + 1
      setEventStatusQuizContent(eventKey, nextQuizContentIndex, quizes[quizKey].quizContents[nextQuizContentIndex])
    }

    return <QuizeFacilitator {...{ event, quizes, eventStatus, nextQuizContent }}  />
  }
}

export default Container
