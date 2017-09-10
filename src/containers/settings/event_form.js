// @flow
import React from 'react'
import { Form } from 'react-form'
import IconButton from 'material-ui/IconButton'
import DoneIcon from 'material-ui-icons/Done'
import UndoIcon from 'material-ui-icons/Undo'
import TextField from '../../components/atoms/text_field'
import type { EventDataType } from '../../types'

type PropsType = { event: EventDataType, saveEvent: (event: EventDataType) => void }

export default ({ event, saveEvent }: PropsType) => (
  <Form defaultValues={event} onSubmit={saveEvent}>
    {({ values, setValue, submitForm, resetForm }) => (
      <div>
        <TextField field="eventTitle" label="イベント名" />
        <IconButton aria-label="Done" color="primary" onClick={submitForm}>
          <DoneIcon />
        </IconButton>
        <IconButton aria-label="Clear" onClick={resetForm}>
          <UndoIcon />
        </IconButton>
      </div>
    )}
  </Form>
)
