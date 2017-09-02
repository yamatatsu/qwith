// @flow
import React, { Component } from 'react'
import _get from 'lodash/get'

import Page from '../components/pages/settings'

import type { UserType, OwnerType } from '../types'

type PropsType = {
  user: UserType,
  owner: ?OwnerType,
}
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const events = _get(this.props.owner, 'events')
    return <Page events={events} />
  }
}

export default Container
