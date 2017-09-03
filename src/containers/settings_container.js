// @flow
import React, { Component } from 'react'
import _get from 'lodash/get'

import { observeAuth } from '../firebase/auth'
import { observeOwner } from '../firebase/database'
import Page from '../components/pages/settings'

import type { OwnerType } from '../types'

type PropsType = {}
type StateType = {
  owner: ?OwnerType,
}

class Container extends Component<PropsType, StateType> {
  state = {
    owner: null,
  }

  componentWillMount() {
    observeAuth(_user => {
      const ownerKey = _get(_user, 'uid')

      observeOwner(ownerKey, (owner) => {
        this.setState({ ...this.state, owner })
      })
    })
  }

  render() {
    const events = _get(this.state.owner, 'events')
    return <Page events={events} />
  }
}

export default Container
