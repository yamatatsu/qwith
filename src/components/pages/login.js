// @flow
import React from 'react'
import { signInWithPopup } from '../../infrastructure/auth'

export default () => (
  <div>
    <h1>Login</h1>
    <button onClick={signInWithPopup}>googleアカウントでログイン</button>
  </div>
)
