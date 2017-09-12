// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'

import { observeMembers } from '../../infrastructure/database'

import type { MatchType, EventKeyType, MembersDataType } from '../../types'

type PropsType = { match: MatchType<{ eventKey: EventKeyType }> }
type StateType = {
  members: ?MembersDataType | 'not_feached',
}

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class MembersObserver extends Component<PropsType, StateType> {
    state = {
      members: 'not_feached',
    }

    componentWillMount() {
      const { eventKey } = this.props.match.params
      observeMembers(eventKey, (members) => {
        this.setState({ ...this.state, members })
      })
    }

    render() {
      const { members } = this.state

      if (members === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ members }} />
    }
  }
}
