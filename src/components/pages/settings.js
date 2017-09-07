// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import _map from 'lodash/map'
import BasicTemplate from '../templates/basic'

import type { EventsDataType } from '../../types'

type PropsType = { events: ?EventsDataType }
export default ({ events }: PropsType) => {
  return (
    <BasicTemplate>
      <h1>Settings</h1>
      {_map(events, (event, eventKey) => (
        <div key={eventKey}>
          <h3>{event.eventTitle}</h3>
          <Link to={`/${eventKey}/controller`}>
            <button>始める</button>
          </Link>
        </div>
      ))}
    </BasicTemplate>
  )
}
