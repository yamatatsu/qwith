// @flow
import React from 'react'
import _ from 'lodash'
import QRCode from  'qrcode.react'
import BasicTemplate from '../templates/basic'
import QuizContent from '../organisms/quiz_content'
import type { EventKeyType, EventDataType, QuizDataType, EventStatusDataType, MembersDataType, MemberDataType } from '../../types'

type EventFacilitatorPropsType = {
  eventKey: EventKeyType,
  event: EventDataType,
  quiz: QuizDataType,
  beginQuiz: Function,
}
export const EventFacilitator = ({ eventKey, event, quiz, beginQuiz }: EventFacilitatorPropsType) => {
  const urlBase: string = process.env.REACT_APP_URL_BASE || ''
  return (
    <BasicTemplate>
      <h1>{event.eventTitle}</h1>
      <div style={{ margin: 20 }}>
        <QRCode value={`${urlBase}/${eventKey}/member`} />
      </div>
      <button onClick={() => beginQuiz()}>
        {quiz.quizTitle}を始める
      </button>
    </BasicTemplate>
  )
}

type QuizeFacilitatorPropsType = {
  event: EventDataType,
  eventStatus: EventStatusDataType,
  members: ?MembersDataType,
  continueQuiz: Function,
  finishQuiz: Function,
  resetMembers: Function,
}
export const QuizeFacilitator = (props: QuizeFacilitatorPropsType) => {
  const { event, eventStatus, members, continueQuiz, finishQuiz, resetMembers } = props
  const isLastQuizContent = eventStatus.quizContentIndexMax === eventStatus.quizContentIndex

  return (
    <BasicTemplate>
      <h1>{event.eventTitle}</h1>
      <QuizContent eventStatus={eventStatus} />
      <ul>
        {_.chain(members)
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
