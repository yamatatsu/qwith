// @flow
import React from 'react'

import type { OwnerType } from '../../domain/entities/owner'
import type { EventStatusType } from '../../domain/entities/eventStatus'

type EventFacilitatorPropsType = { owner: OwnerType }
export const EventFacilitator = ({ owner }: EventFacilitatorPropsType) => {
  const { event, quiz, beginQuiz } = owner
  return (
    <div>
      <h1>{event.eventTitle}</h1>
      <button onClick={() => beginQuiz()}>
        {quiz.quizTitle}を始める
      </button>
    </div>
  )
}

type QuizeFacilitatorPropsType = { owner: OwnerType, eventStatus: EventStatusType }
export const QuizeFacilitator = ({ owner, eventStatus }: QuizeFacilitatorPropsType) => {
  const { event, continueQuiz, finishQuiz, resetMembers } = owner
  const { quizContentIndex, quizContent, quizContentIndexMax, hasNoNext } = eventStatus

  return (
    <div>
      <h1>{event.eventTitle}</h1>
      <h3>{quizContent.qText}</h3>
      <ul>
        {['a', 'b', 'c', 'd'].map((choice) => (
          <li key={choice}>
            {choice}: {quizContent.choices[choice]}
          </li>
        ))}
      </ul>
      <div>{quizContentIndex}問目 / {quizContentIndexMax}問中</div>
      <button onClick={continueQuiz} disabled={hasNoNext}>次のクイズに進む</button>
      <br/><br/><br/>
      <button onClick={finishQuiz}>クイズを終える</button><br/>
      <button onClick={resetMembers}>参加者をリセットする</button>
    </div>
  )
}
