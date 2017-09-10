// @flow
import React from 'react'
import { FormInput } from 'react-form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'

type PropsType = { field: string | Array<string | number>, label: string, choices: string[] }

export default ({ field, label, choices, ...custom }: PropsType) => (
  <FormInput field={field}>
    {({ setValue, getValue, setTouched }) => (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          name={label}
          value={getValue()}
          onChange={(_e, value) => {
            setTouched()
            setValue(value)
          }}
        >
          {['a', 'b', 'c', 'd'].map(choice => (
            <FormControlLabel key={choice} value={choice} control={<Radio />} label={choice} />
          ))}
        </RadioGroup>
      </FormControl>
    )}
  </FormInput>
)
