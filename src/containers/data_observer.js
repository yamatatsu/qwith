import React, { Component } from 'react'

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
    observe(user => {
      const { uid, displayName, photoURL } = user
      this.setState({ ...this.state, user: { uid, displayName, photoURL } })
    })
  }

  render() {
    return <Router {...this.state} />
  }
}

export default Container
