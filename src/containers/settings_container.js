// @flow
import React, { Component } from 'react'
import { setEvent } from '../infrastructure/database'
import withUser from './observers/user_observer'
import Page from '../components/pages/settings'

import type { EventKeyType, UserType, OwnerDataType, EventDataType } from '../types'

type PropsType = { user: UserType, owner: ?OwnerDataType }
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const { uid: ownerKey } = this.props.user
    const saveEvent = (eventKey: EventKeyType) => (event: EventDataType) => {
      setEvent(ownerKey, eventKey, event)
    }
    return <Page owner={this.props.owner} saveEvent={saveEvent} />
  }
}

export default withUser(Container)
