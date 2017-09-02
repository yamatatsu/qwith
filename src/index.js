import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import DataObserver from './containers/data_observer'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<DataObserver />, document.getElementById('root'))
registerServiceWorker()
