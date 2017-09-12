// @flow
import React from 'react'
import QRCode from  'qrcode.react'
import BasicTemplate from '../templates/basic'
import QuizContent from '../organisms/quiz_content'
import type { OwnerType } from '../../domain/entities/owner'
import type { EventStatusType } from '../../domain/entities/eventStatus'

type EventFacilitatorPropsType = { owner: OwnerType }
export const EventFacilitator = ({ owner }: EventFacilitatorPropsType) => {
  const { eventKey, event, quiz, beginQuiz } = owner
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

type QuizeFacilitatorPropsType = { owner: OwnerType, eventStatus: EventStatusType, members: Object[] }
export const QuizeFacilitator = ({ owner, eventStatus, members }: QuizeFacilitatorPropsType) => {
  const { event, continueQuiz, finishQuiz, resetMembers } = owner
  const { hasNoNext } = eventStatus

  return (
    <BasicTemplate>
      <h1>{event.eventTitle}</h1>
      <QuizContent eventStatus={eventStatus} />
      <ul>
        {members.map((m, i) => (
          <li key={i}>{i + 1}位: {m.nickname}さん {m.time}秒</li>
        ))}
      </ul>
      <button onClick={() => continueQuiz(eventStatus)} disabled={hasNoNext}>次のクイズに進む</button>
      <br/><br/><br/>
      <button onClick={finishQuiz}>クイズを終える</button><br/>
      <button onClick={resetMembers}>参加者をリセットする</button>
    </BasicTemplate>
  )
}
