// @flow
import React from 'react'
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

type PropsType = { children: *, signOut?: Function }

const BasicTemplate = ({ children, signOut }: PropsType) => (
  <div>
    <Header {...{ signOut }} />
    <div>
      {children}
    </div>
  </div>
)
export default BasicTemplate

const Header = ({ signOut }) => (
  <AppBar position="static">
    <Toolbar>
      <Grid container justify="space-between" align="center">
        <Grid>
          <Typography type="title" color="inherit">
            QWith
          </Typography>
        </Grid>
        <Grid>
          {signOut && <Button color="contrast" onClick={signOut}>ログアウト</Button>}
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
)
