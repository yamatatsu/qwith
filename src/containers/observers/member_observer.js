// @flow
import React, { Component } from 'react'
import genUUID from 'uuid/v4'
import type { ComponentType } from 'react'

import { getMemberDb } from '../../infrastructure/database'
import { getMemberKey, setMemberKey } from '../../infrastructure/cookie'

import type { OwnerKeyType, MemberKeyType, MemberDataType } from '../../types'

type PropsType = { ownerKey: OwnerKeyType }
type StateType = {
  memberKey: MemberKeyType | 'not_creaded',
  member: ?MemberDataType | 'not_feached',
}

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class MemberObserver extends Component<PropsType, StateType> {
    state = {
      memberKey: 'not_creaded',
      member: 'not_feached',
    }
    db = null

    componentWillMount() {
      const memberKey = getMemberKey() || genUUID()

      setMemberKey(memberKey)

      this.db = getMemberDb(this.props.ownerKey, memberKey)

      this.db.subscribe((member: MemberDataType) => {
        this.setState({ ...this.state, member, memberKey })
      })
    }
    componentWillUnmount () {
      this.db && this.db.unsubscribe()
    }

    render() {
      const { memberKey, member } = this.state
      if (memberKey === 'not_creaded' || member === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ memberKey, member }} />
    }
  }
}
