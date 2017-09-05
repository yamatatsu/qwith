// @flow
import React, { Component } from 'react'

import withUser from './user_observer'
import Page from '../components/pages/settings'

import type { OwnerDataType } from '../types'

type PropsType = { owner: ?OwnerDataType }
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const events = this.props.owner && this.props.owner.events
    return <Page events={events} />
  }
}

export default withUser(Container)
