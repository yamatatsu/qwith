// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'

import withUser from './user_observer'

export default withUser(() => <Redirect to='/settings' />)
