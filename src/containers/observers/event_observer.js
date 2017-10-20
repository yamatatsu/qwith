// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'
import { getOwnerDb } from '../../infrastructure/database'

import type { OwnerKeyType, OwnerDataType, EventDataType } from '../../types'

type PropsType = { ownerKey: OwnerKeyType }
type StateType = { event: ?EventDataType | 'not_feached' }

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class EventObserver extends Component<PropsType, StateType> {
    state = { event: 'not_feached' }
    db = null

    componentWillMount() {
      this.db = getOwnerDb(this.props.ownerKey)

      this.db.subscribe((owner: OwnerDataType) => {
        this.setState({ ...this.state, event: owner.event })
      })
    }
    componentWillUnmount () {
      this.db && this.db.unsubscribe()
    }

    render() {
      const { event } = this.state

      if (event === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ event }} />
    }
  }
}
