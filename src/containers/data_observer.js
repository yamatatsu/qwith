// @flow
import React, { Component } from 'react'
import _pick from 'lodash/pick'

import { observe } from '../firebase/auth'
import Router from './Router'

import type { UserType } from '../types'

type PropsType = {}
type StateType = {
  user: ?UserType,
}

class Container extends Component<PropsType, StateType> {
  state = {
    user: null,
  }

  componentWillMount() {
    observe(_user => {
      const user = _user && _pick(_user, ['uid', 'displayName', 'photoURL'])
      this.setState({ ...this.state, user: user })
    })
  }

  render() {
    return <Router {...this.state} />
  }
}

export default Container
