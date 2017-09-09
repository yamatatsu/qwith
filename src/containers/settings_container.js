// @flow
import React, { Component } from 'react'

import withUser from './observers/user_observer'
import Page from '../components/pages/settings'

import type { UserType, OwnerDataType } from '../types'

type PropsType = { user: UserType, owner: ?OwnerDataType }
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    return <Page owner={this.props.owner} />
  }
}

export default withUser(Container)
