// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'

import { observeMember, getMemberKey } from '../infrastructure/database'

import type { MatchType, EventKeyType, MemberKeyType, MemberDataType } from '../types'

type PropsType = { match: MatchType<{ eventKey: EventKeyType }> }
type StateType = {
  memberKey: MemberKeyType | 'not_creaded',
  member: ?MemberDataType | 'not_feached',
}

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class EventStatusObserver extends Component<PropsType, StateType> {
    state = {
      memberKey: 'not_creaded',
      member: 'not_feached',
    }

    componentWillMount() {
      const { eventKey } = this.props.match.params
      const memberKey = getMemberKey(eventKey)

      observeMember(eventKey, memberKey, (member) => {
        this.setState({ ...this.state, member, memberKey })
      })
    }

    render() {
      const { memberKey, member } = this.state
      if (memberKey === 'not_creaded' || member === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ memberKey, member }} />
    }
  }
}
