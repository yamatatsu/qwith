import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import initializeFirebase from './firebase/initialize'
import Router from './containers/Router'
import registerServiceWorker from './registerServiceWorker'

initializeFirebase()
ReactDOM.render(<Router />, document.getElementById('root'))
registerServiceWorker()
