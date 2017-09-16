// @flow
import React from 'react'
import _ from 'lodash'
import QRCode from  'qrcode.react'
// import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import BasicTemplate from '../templates/basic'
import QuizContent from '../organisms/quiz_content'
import type { EventKeyType, EventDataType, QuizDataType, EventStatusDataType, MembersDataType, MemberDataType } from '../../types'

type PropsType = {
  eventKey: EventKeyType,
  event: EventDataType,
  quiz: QuizDataType,
  eventStatus: ?EventStatusDataType,
  members: ?MembersDataType,
  beginQuiz: Function,
  continueQuiz: Function,
  finishQuiz: Function,
  resetMembers: Function,
  signOut: Function,
}
const QuizeFacilitator = (props: PropsType) => {
  const { eventKey, event, quiz, eventStatus, members, beginQuiz, continueQuiz, finishQuiz, resetMembers, signOut } = props
  const isLastQuizContent = !!eventStatus && (eventStatus.quizContentIndexMax === eventStatus.quizContentIndex)
  const urlBase: string = process.env.REACT_APP_URL_BASE || ''

  return (
    <BasicTemplate signOut={signOut}>
      <AppBar position="static" style={{ marginTop: 20 }}>
        <Toolbar>
          <Typography type="title" color="inherit">
            {event.eventTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {!eventStatus && (
        <div>
          <QRCode value={`${urlBase}/${eventKey}/member`} />
          <button onClick={() => beginQuiz()}>
            {quiz.quizTitle}を始める
          </button>
        </div>
      )}

      {eventStatus && <QuizContent eventStatus={eventStatus} />}

      <ul>
        {eventStatus && _.chain(members)
          .map((m: MemberDataType) => ({
            nickname: m.nickname,
            time: m.quiz && m.quiz.answers[eventStatus.quizContentIndex] && (m.quiz.answers[eventStatus.quizContentIndex].answeredAt - eventStatus.quizContentStartAt) / 1000
          }))
          .sortBy('time')
          .map((m, i) => (
            <li key={i}>{i + 1}位: {m.nickname}さん {m.time}秒</li>
          ))
          .value()
        }
      </ul>
      <button onClick={() => continueQuiz(eventStatus)} disabled={isLastQuizContent}>次のクイズに進む</button>
      <br/><br/><br/>
      <button onClick={finishQuiz}>クイズを終える</button><br/>
      <button onClick={resetMembers}>参加者をリセットする</button>
    </BasicTemplate>
  )
}

export default QuizeFacilitator
