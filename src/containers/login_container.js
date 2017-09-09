// @flow
import React from 'react'
import { Redirect } from 'react-router-dom'

import withUser from './observers/user_observer'

export default withUser(() => <Redirect to='/settings' />)
