// @flow
import React from 'react'
import { FormInput } from 'react-form'
import TextField from 'material-ui/TextField'

type PropsType = { field: string | Array<string | number>, label: string }

export default ({ field, label, ...custom }: PropsType) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <TextField
        label={label}
        value={getValue()}
        onChange={(e) => {
          setTouched()
          setValue(e.target.value)
        }}
      />
    )}
  </FormInput>
)
