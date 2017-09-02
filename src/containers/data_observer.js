// @flow
import React, { Component } from 'react'
import _pick from 'lodash/pick'

import { observe } from '../firebase/auth'
import { observeOwner } from '../firebase/database'
import Router from './Router'

import type { UserType, OwnerType } from '../types'

type PropsType = {}
type StateType = {
  user: ?UserType,
  owner: ?OwnerType
}

class Container extends Component<PropsType, StateType> {
  state = {
    user: null,
    owner: null,
  }

  componentWillMount() {
    observe(_user => {
      const user = _user && _pick(_user, ['uid', 'displayName', 'photoURL'])

      this.setState({ ...this.state, user: user })

      observeOwner(user.uid, (owner) => {
        this.setState({ ...this.state, owner })
      })
    })
  }

  render() {
    return <Router {...this.state} />
  }
}

export default Container
