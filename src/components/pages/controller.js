// @flow
import React from 'react'
import QRCode from  'qrcode.react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown'

import BasicTemplate from '../templates/basic'
import QuizContent from '../organisms/quiz_content'
import type { OwnerKeyType, EventDataType } from '../../types'

type PropsType = {
  ownerKey: OwnerKeyType,
  event: EventDataType,
  tabIndex: number,
  beginQuiz: Function,
  continueQuiz: Function,
  finishQuiz: Function,
  signOut: Function,
  changeTabIndex: Function,
}
const ControllerPage = (props: PropsType) => {
  const { ownerKey, event, beginQuiz, continueQuiz, finishQuiz, signOut, tabIndex, changeTabIndex } = props
  const { quiz } = event
  const isLastQuizContent = !!event && (event.quizContentIndexMax === event.quizContentIndex)
  const urlBase: string = process.env.REACT_APP_URL_BASE || ''

  return (
    <BasicTemplate signOut={signOut}>
      <AppBar position="static" style={{ marginTop: 20, marginBottom: 20 }} color="default">
        <Toolbar>
          <Typography type="title" color="inherit">
            {quiz.quizTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container direction="row" align="stretch">
        <Grid sm={2} item>
          <Paper>
            <Grid container direction="column" align="center">
              <Grid item>
                <Typography onClick={beginQuiz}>QRコード</Typography>
              </Grid>
              {quiz.quizContents
                .map((q, i) => <Typography key={i}>{i+1}問目</Typography>)
                .reduce((arr, c) => ([...arr, <KeyboardArrowDownIcon/>, c]), [])
                .map((c, i) => <Grid key={i} item>{c}</Grid>)
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid sm={10} item>
          <AppBar position="static" color="default">
            <Tabs
              value={tabIndex}
              onChange={changeTabIndex}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="クイズ" />
              <Tab label="割合" />
              <Tab label="回答" />
              <Tab label="順位" />
            </Tabs>
          </AppBar>
          {tabIndex === 0 && (
            <Paper style={{ height: "100%" }}>
              {event.status === 'no_quiz_started' && (
                <div>
                  <QRCode value={`${urlBase}/${ownerKey}/member`} />
                  <button onClick={beginQuiz}>
                    {quiz.quizTitle}を始める
                  </button>
                </div>
              )}

              {event.status !== 'no_quiz_started' && (
                <div>
                  <QuizContent event={event} />
                  <button onClick={continueQuiz} disabled={isLastQuizContent}>次のクイズに進む</button>
                  <br/><br/><br/>
                  <Link to={'/settings'} onClick={finishQuiz}>
                    <button>クイズを終える</button>
                  </Link>
                </div>
              )}
            </Paper>
          )}
          {/* {tabIndex === 1 && (
            <Paper style={{ height: "100%" }}>
              <ul>
                {_.chain(members)
                  .countBy((m: MemberDataType) => {
                    const choice = m.quiz && m.quiz.answers[event.quizContentIndex] && m.quiz.answers[event.quizContentIndex].choice
                    return choice || '未回答'
                  })
                  .map((count, choice) => ({ choice, count }))
                  .sortBy('choice')
                  .map(({ choice, count }) => (
                    <li key={choice}>{choice}: {count}</li>
                  ))
                  .value()
                }
              </ul>
            </Paper>
          )}
          {tabIndex === 2 && (
            <Paper style={{ height: "100%" }}>
              <ul>
                {eventStatus && _.chain(members)
                  .reduce(([arr, nextRank], m: MemberDataType) => {
                    const answer = m.quiz && m.quiz.answers[eventStatus.quizContentIndex] && m.quiz.answers[eventStatus.quizContentIndex]
                    const correct = answer && (answer.choice === eventStatus.quizContent.correctChoice)
                    return [
                      [...arr, {
                        nickname: m.nickname,
                        hasAnswered: !!answer,
                        choice: answer && answer.choice,
                        correct,
                        rank: correct && nextRank,
                        time: answer && (answer.answeredAt - eventStatus.quizContentStartAt) / 1000
                      }],
                      correct ? nextRank + 1 : nextRank,
                    ]
                  }, [[], 1])
                  .sortBy('time')
                  .thru(([arr, _]) => arr)
                  .map(({ nickname, hasAnswered, choice, correct, rank, time }, i) => (
                    <li key={i}>
                      {nickname}さん
                      {hasAnswered ? time : '---'}秒
                      {!hasAnswered ? '未回答' : correct ? `正解(${rank}位)` : 'ハズレ' }
                    </li>
                  ))
                  .value()
                }
              </ul>
            </Paper>
          )}
          {tabIndex === 3 && (
            <Paper style={{ height: "100%" }}>
            </Paper>
          )} */}
        </Grid>
      </Grid>
    </BasicTemplate>
  )
}

export default ControllerPage
