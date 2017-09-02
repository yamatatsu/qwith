import React, { Component } from 'react'

import { signInWithPopup } from '../firebase/auth'
import Page from '../components/pages/login'

type PropsType = {}
type StateType = {
  user: ?Object,
}

class Container extends Component<PropsType, StateType> {
  state = {
    user: null,
  }

  login() {
    signInWithPopup()
  }

  render() {
    return <Page login={() => this.login()}/>
  }
}

export default Container
