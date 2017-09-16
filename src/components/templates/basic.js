// @flow
import React from 'react'
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { signOut } from '../../infrastructure/auth'

type PropsType = { children: * }
const BasicTemplate = ({ children }: PropsType) => (
  <div>
    <Header />
    {children}
  </div>
)
export default BasicTemplate

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Grid container justify="space-between" align="center">
        <Grid>
          <Typography type="title" color="inherit">
            QWith
          </Typography>
        </Grid>
        <Grid>
          <Button color="contrast" onClick={signOut}>ログアウト</Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)
