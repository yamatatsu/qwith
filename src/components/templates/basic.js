// @flow
import React from 'react'
import { signOut } from '../../infrastructure/auth'

type PropsType = { children: * }
const BasicTemplate = ({ children }: PropsType) => (
  <div>
    <div>
      <button onClick={signOut}>ログアウト</button>
    </div>
    {children}
  </div>
)
export default BasicTemplate
