// @flow
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import DoneIcon from 'material-ui-icons/Done'
import UndoIcon from 'material-ui-icons/Undo'
import type { EventDataType } from '../../types'

type EventFormType = { eventTitle?: string }
type PropsType = { event: EventDataType, saveEvent: (event: EventDataType) => void }
type StateType = { event: EventFormType }

export default class EventForm extends Component<PropsType, StateType> {
  constructor({ event }: PropsType) {
    super()

    const { eventTitle } = event
    this.state = { event: { eventTitle } }
  }

  onChange(name: string, value: string) {
    this.setState({ ...this.state, event: { [name]: value } })
  }

  onSave() {
    const { eventTitle } = this.state.event
    if (!eventTitle) {
      alert('イベント名が空です')
      return
    }
    this.props.saveEvent({ eventTitle })
  }

  onClear() {
    const { eventTitle } = this.props.event
    this.setState({ event: { eventTitle } })
  }

  render() {
    const onChange = (e) => {
      const { name, value } = e.target
      this.onChange(name, value)
    }
    const onClear = () => {
      this.onClear()
    }
    const onSave = () => {
      this.onSave()
    }
    return <Event event={this.state.event} {...{ onChange, onClear, onSave }} />
  }
}

const Event = ({ event, onChange, onClear, onSave }: { event: EventFormType, onChange: Function, onClear: Function, onSave: Function }) => (
  <div>
    <TextField name="eventTitle" label="イベント名" value={event.eventTitle} onChange={onChange} />
    <IconButton aria-label="Done" color="primary" onClick={onSave}>
      <DoneIcon />
    </IconButton>
    <IconButton aria-label="Clear" onClick={onClear}>
      <UndoIcon />
    </IconButton>
  </div>
)
