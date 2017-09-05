// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'

import { observeEventStatus } from '../infrastructure/database'

import type { MatchType, EventKeyType, EventStatusDataType } from '../types'

type PropsType = { match: MatchType<{ eventKey: EventKeyType }> }
type StateType = {
  eventStatus: ?EventStatusDataType | 'not_feached',
}

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class EventStatusObserver extends Component<PropsType, StateType> {
    state = {
      eventStatus: 'not_feached',
    }

    componentWillMount() {
      const { eventKey } = this.props.match.params
      observeEventStatus(eventKey, (eventStatus) => {
        this.setState({ ...this.state, eventStatus })
      })
    }

    render() {
      const { eventStatus } = this.state

      if (eventStatus === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ eventStatus }} />
    }
  }
}
