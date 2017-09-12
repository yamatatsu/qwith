// @flow
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter, Redirect } from 'react-router-dom'

import Login from '../login_container'
import Settings from '../settings_container'
import Controller from '../controller_container'
import Member from '../member_container'

const Router = () => {
  return (
    <BrowserRouter>
      {renderRoutes([
        { component: () => <Redirect to="/login" />, exact: true, path: '/' },
        { component: Login, exact: true, path: '/login' },
        { component: Settings, exact: true, path: '/settings' },
        { component: Controller, exact: true, path: '/:eventKey/controller' },
        { component: ({ match }) => <div>screen</div>, exact: true, path: '/:eventKey/screen' },
        { component: Member, exact: true, path: '/:eventKey/member' },
      ])}
    </BrowserRouter>
  )
}
export default Router
