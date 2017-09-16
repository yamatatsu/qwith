// @flow
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter, Redirect } from 'react-router-dom'

import Login from './containers/login_container'
import Settings from './containers/settings_container'
import Controller from './containers/controller_container'
import Screen from './containers/screen_container'
import Member from './containers/member_container'

const Router = () => {
  return (
    <BrowserRouter>
      {renderRoutes([
        { component: () => <Redirect to="/login" />, exact: true, path: '/' },
        { component: Login,      exact: true, path: '/login' },
        { component: Settings,   exact: true, path: '/settings' },
        { component: Controller, exact: true, path: '/:eventKey/controller' },
        { component: Screen,     exact: true, path: '/:eventKey/screen' },
        { component: Member,     exact: true, path: '/:eventKey/member' },
      ])}
    </BrowserRouter>
  )
}
export default Router
