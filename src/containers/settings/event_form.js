// @flow
import React, { Component } from 'react'

import type { EventDataType } from '../../types'

type EventFormType = { eventTitle?: string }
type PropsType = { event: EventDataType }
type StateType = { event: EventFormType }

export default class EventForm extends Component<PropsType, StateType> {
  constructor({ event }: PropsType) {
    super()

    const { eventTitle } = event
    this.state = { event: { eventTitle } }
  }

  render() {
    return <Event event={this.state.event} />
  }
}

const Event = ({ event }: { event: EventFormType }) => (
  <div>
    {event.eventTitle}
  </div>
)
