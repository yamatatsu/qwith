// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'
import { observeAuth } from '../../infrastructure/auth'
import { observeOwner } from '../../infrastructure/database'
import Login from '../../components/pages/login'

import type { UserType, OwnerDataType } from '../../types'

type StateType = {
  user: 'not_feached' | ?UserType,
  owner: 'not_feached' | ?OwnerDataType,
}

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class UserObserver extends Component<*, StateType> {
    state = {
      user: 'not_feached',
      owner: 'not_feached',
    }
    removeAuthListener = null
    removeOwnerListener = null

    componentDidMount() {
      this.removeAuthListener = observeAuth(user => {
        this.setState({ ...this.state, user })

        if (!user) return
        this.removeOwnerListener = observeOwner(user.uid, (owner) => {
          this.setState({ ...this.state, owner })
        })
      })
    }
    componentWillUnmount () {
      this.removeAuthListener && this.removeAuthListener()
      this.removeOwnerListener && this.removeOwnerListener()
    }

    render() {
      const { user, owner } = this.state

      if (!user) return <Login />
      if (user === 'not_feached' || owner === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ user, owner }} />
    }
  }
}
