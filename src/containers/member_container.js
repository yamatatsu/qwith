// @flow
import React, { Component } from 'react'

import AnswerPage from '../components/pages/members/answer'

import type { MatchType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: string, memberKey: string }>,
}
type StateType = {
}
class Container extends Component<PropsType, StateType> {
  render() {
    const { eventKey, memberKey } = this.props.match.params
    return <AnswerPage {...{ eventKey, memberKey }} />
  }
}

export default Container
