// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'

import { observeAuth, signInWithPopup } from '../infrastructure/auth'
import { observeOwner } from '../infrastructure/database'

import type { UserType, OwnerDataType } from '../types'

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

    componentWillMount() {
      observeAuth(user => {
        if (user) {
          this.setState({ ...this.state, user })

          observeOwner(user.uid, (owner) => {
            this.setState({ ...this.state, owner })
          })
        }
      })
    }

    render() {
      const { user, owner } = this.state

      if (!user) signInWithPopup()
      if (!user || user === 'not_feached' || owner === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ user, owner }} />
    }
  }
}
