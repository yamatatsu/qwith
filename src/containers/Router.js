import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'

import App from '../App'

// const routes = [
//   { component: App,
//     routes: [
//       { path: '/',
//         exact: true,
//         component: Home
//       },
//       { path: '/child/:id',
//         component: Child,
//         routes: [
//           { path: '/child/:id/grand-child',
//             component: GrandChild
//           }
//         ]
//       }
//     ]
//   }
// ]
const routes = [
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
        <div>count: 1</div>
        <button>count up</button>
      </div>
    )
  },
  { path: '/@:user/:event/members/:member',
    exact: true,
    component: ({ match }) => (
      <div>
        <p1>member</p1>
        <div>member: @{match.params.member}</div>
        <div>count: 1</div>
      </div>
    )
  },
]

export default props => (
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
)
