import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import Router from './router'

const theme = createMuiTheme()

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router />
  </MuiThemeProvider>
)

export default App;
