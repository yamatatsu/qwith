// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import _map from 'lodash/map'
import BasicTemplate from '../templates/basic'
import QuizForm from '../../containers/forms/quiz_form'

import type { QuizKeyType, QuizesDataType, QuizDataType } from '../../types'

type PropsType = {
  quizes: ?QuizesDataType,
  saveQuiz: (quizKey?: QuizKeyType) => (quiz: QuizDataType) => void,
  startEvent: (quizKey: QuizKeyType, quiz: QuizDataType) => () => void,
}
export default ({ quizes, saveQuiz, startEvent }: PropsType) => {
  return (
    <BasicTemplate>
      <h1>Settings</h1>

      {_map(quizes, (quiz, quizKey) => {
        return <Event key={quizKey} {...{ quiz, saveQuiz: saveQuiz(quizKey), startEvent: startEvent(quizKey, quiz) }}/>
      })}

      <h4>新しいクイズ</h4>
      <QuizForm saveQuiz={saveQuiz()} />
    </BasicTemplate>
  )
}

type EventPropsType = {
  quiz: ?QuizDataType,
  saveQuiz: (quiz: QuizDataType) => void,
  startEvent: () => void,
}
const Event = ({ quiz, saveQuiz, startEvent }: EventPropsType) => (
  <div>
    <Link to={'/controller'} onClick={startEvent}>
      <button>始める</button>
    </Link>
    <br/>
    <br/>
    <QuizForm quiz={quiz} saveQuiz={saveQuiz} />
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
)
