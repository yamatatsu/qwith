// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'

import { observeMember, getMemberKey } from '../../infrastructure/database'

import type { OwnerKeyType, MemberKeyType, MemberDataType } from '../../types'

type PropsType = { ownerKey: OwnerKeyType }
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
    remove = null

    componentDidMount() {
      const { ownerKey } = this.props
      const memberKey = getMemberKey(ownerKey)

      this.remove = observeMember(ownerKey, memberKey, (member) => {
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
