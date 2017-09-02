import React, { Component } from 'react'

import Page from '../components/pages/controller'

import type { MatchType } from '../types'

type PropsType = {
  match: MatchType<{ eventKey: string }>,
}
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const { eventKey } = this.props.match.params
    return <Page {...{ eventKey }} />
  }
}

export default Container
