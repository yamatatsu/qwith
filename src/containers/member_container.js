// @flow
import React, { Component } from 'react'
import Cookies from 'js-cookie'
import _get from 'lodash/get'

import { observeEventStatus, pushMember, setAnswer } from '../firebase/database'
import Page from '../components/pages/member'

import type { MatchType, EventStatusType, ChoiceType } from '../types'

const MEMBER_KEY_COOKIE_NAME = 'mk'

type PropsType = {
  match: MatchType<{ eventKey: string }>,
}
type StateType = {
  eventStatus: ?EventStatusType,
  memberKey: ?string,
}
class Container extends Component<PropsType, StateType> {
  componentWillMount() {
    const { eventKey } = this.props.match.params
    observeEventStatus(eventKey, (eventStatus) => {
      this.setState({ ...this.state, eventStatus })
    })

    const memberKey = Cookies.get(MEMBER_KEY_COOKIE_NAME) || pushMember(eventKey).key
    Cookies.set(MEMBER_KEY_COOKIE_NAME, memberKey, { expires: 30 })
    this.setState({ ...this.state, memberKey })
  }

  render() {
    const { eventKey } = this.props.match.params
    const { eventStatus, memberKey } = this.state

    if (!memberKey) return null // TODO クルクル
    if (!eventStatus || !eventStatus.quizKey) {
      return <div>クイズ開始までお待ち下さい。</div>
    }

    const { quizKey, quizContentIndex } = eventStatus

    const answer = (choice: ChoiceType) => setAnswer(eventKey, memberKey, quizKey, quizContentIndex, choice)

    const myAnswer = _get(eventStatus, `members.${memberKey}.answers.${quizKey}.${quizContentIndex}`)

    if (!myAnswer) {
      return <Page {...{ eventKey, memberKey, eventStatus, answer }} />
    }

    if (eventStatus.quizContent.answerChoice === myAnswer) {
      return <div>正解！！</div>
    } else {
      return <div>はずれ。。。</div>
    }

  }
}

export default Container