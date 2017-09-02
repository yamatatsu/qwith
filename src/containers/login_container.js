import React, { Component } from 'react'
import { Redirect } from 'react-router';

import signInWithPopup from '../firebase/auth'
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
      .then(user => {
        console.log(user);
        this.setState({ user })
      })
  }

  render() {
    if (this.state.user) {
      return <Redirect push to='/settings' />
    }
    return <Page login={() => this.login()}/>
  }
}

export default Container
