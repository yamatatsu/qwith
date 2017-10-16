// @flow
import React from 'react'
import { Form } from 'react-form'
import IconButton from 'material-ui/IconButton'
import DoneIcon from 'material-ui-icons/Done'
import TextField from '../../components/atoms/text_field'
import type { MemberDataType } from '../../types'

type PropsType = { saveMember: (member: MemberDataType) => void }

export default ({ saveMember }: PropsType) => (
  <Form defaultValues={{ nickname: '' }} onSubmit={saveMember}>
    {({ submitForm }) => (
      <div>
        <TextField field="nickname" label="ニックネーム" />
        <IconButton aria-label="Done" color="primary" onClick={submitForm}>
          <DoneIcon />
        </IconButton>
      </div>
    )}
  </Form>
)
