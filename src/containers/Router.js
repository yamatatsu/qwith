import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'

import Login from './login_container'
import Settings from './settings_container'
import Controller from './controller_container'
import Member from './member_container'

export default (props) => {
  const user = props.user
  if (!user) {
    return <Login />
  }

  return (
    <BrowserRouter>
      {renderRoutes([
        {
          path: '/login',
          component: Login,
          exact: true,
        },
        {
          path: '/settings',
          component: () => <Settings {...props} />,
          exact: true,
        },
        {
          path: '/:eventKey/controller',
          component: ({ match }) => <Controller match={match} {...props} />,
          exact: true,
        },
        {
          path: '/:eventKey/screen',
          component: ({ match }) => <div>screen</div>,
          exact: true,
        },
        {
          path: '/:eventKey/m/:memberKey/',
          component: ({ match }) => <Member match={match} {...props} />,
          exact: true,
        },
      ])}
    </BrowserRouter>
  )
}
