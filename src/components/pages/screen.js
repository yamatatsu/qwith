// @flow
import React from 'react'
import QRCode from  'qrcode.react'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper'
import BasicTemplate from '../templates/basic'
import type { EventKeyType } from '../../types'

type QRPropsType = {
  eventKey: EventKeyType,
}
export const QR = ({ eventKey }: QRPropsType) => {
  const urlBase: string = process.env.REACT_APP_URL_BASE || ''
  return (
    <BasicTemplate>
      <h1>QRを読んでゲームに参加しよう！</h1>
      <Grid container justify="center">
        <Grid>
          <Paper style={{ padding: 20 }}>
            <QRCode value={`${urlBase}/${eventKey}/member`} size={500} />
          </Paper>
        </Grid>
      </Grid>

    </BasicTemplate>
  )
}
