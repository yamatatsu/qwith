// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'

import { observeEvent } from '../../infrastructure/database'

import type { OwnerKeyType, EventDataType } from '../../types'

type PropsType = { ownerKey: OwnerKeyType }
type StateType = { event: ?EventDataType | 'not_feached' }

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class EventObserver extends Component<PropsType, StateType> {
    state = {
      event: 'not_feached',
    }
    remove = null

    componentDidMount() {
      const { ownerKey } = this.props
      this.remove = observeEvent(ownerKey, (event) => {
        this.setState({ ...this.state, event })
      })
    }
    componentWillUnmount () {
      this.remove && this.remove()
    }


    render() {
      const { event } = this.state

      if (event === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ event }} />
    }
  }
}
