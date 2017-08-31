import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'

import App from '../App'

export default props => {
  const { count, countUp } = props
  return  (
    <BrowserRouter>
      {renderRoutes([
        { path: '/',
          exact: true,
          component: App,
        },
        { path: '/@:user/:event/controller',
          exact: true,
          component: ({ match }) => (
            <div>
              <p1>controller</p1>
              <div>user: @{match.params.user}</div>
              <div>event: {match.params.event}</div>
              <div>count: {count}</div>
              <button onClick={countUp}>count up</button>
            </div>
          )
        },
        { path: '/@:user/:event/members/:member',
          exact: true,
          component: ({ match }) => (
            <div>
              <p1>member</p1>
              <div>member: @{match.params.member}</div>
              <div>count: {count}</div>
            </div>
          )
        },
      ])}
    </BrowserRouter>
  )
}
