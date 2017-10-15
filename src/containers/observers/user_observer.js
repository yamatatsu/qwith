// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'
import { observeAuth, signOut } from '../../infrastructure/auth'
import Login from '../../components/pages/login'

import type { UserType } from '../../types'

type StateType = {
  user: 'not_feached' | ?UserType,
}

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class UserObserver extends Component<*, StateType> {
    state = {
      user: 'not_feached',
    }
    removeListener = null

    componentWillMount() {
      this.removeListener = observeAuth(user => {
        this.setState({ ...this.state, user })
      })
    }
    componentWillUnmount () {
      this.removeListener && this.removeListener()
    }

    render() {
      const { user } = this.state

      if (!user) return <Login />
      if (user === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ user, signOut, ownerKey: user.uid }} />
    }
  }
}
