import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import initializeFirebase from './firebase/initialize'
import DataObserver from './containers/data_observer'
import registerServiceWorker from './registerServiceWorker'

initializeFirebase()
ReactDOM.render(<DataObserver />, document.getElementById('root'))
registerServiceWorker()
