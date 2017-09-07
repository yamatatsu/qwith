// @flow
import React from 'react'
import { signOut } from '../../infrastructure/auth'

type PropsType = { children: * }
export default ({ children }: PropsType) => (
  <div>
    <div>
      <button onClick={signOut}>ログアウト</button>
    </div>
    {children}
  </div>
)
