// @flow
import React, { Component } from 'react'
import { getQuizesDb, getEventDb } from '../infrastructure/database'
import withUser from './observers/user_observer'
import withQuizes from './observers/quizes_observer'
import Page from '../components/pages/settings'

import type { OwnerKeyType, QuizKeyType, QuizesDataType, QuizDataType } from '../types'

type PropsType = {
  ownerKey: OwnerKeyType,
  quizes: ?QuizesDataType,
}
type StateType = {}

class Container extends Component<PropsType, StateType> {
  render() {
    const { ownerKey, quizes } = this.props

    const quizesDb = getQuizesDb(ownerKey)
    const eventDb = getEventDb(ownerKey)

    const saveQuiz = (quizKey?: QuizKeyType) => (quiz: QuizDataType) => {
      if (quizKey) {
        quizesDb.set(quizKey, quiz)
      } else {
        quizesDb.create(quiz)
      }
    }

    const startEvent = (quizKey: QuizKeyType, quiz: QuizDataType) => () =>{
      eventDb.set({
        status: 'no_quiz_started',
        quizKey: quizKey,
        quizContentIndex: 0,
        quiz: quiz,
        quizContent: quiz.quizContents[0],
        quizContentIndexMax: quiz.quizContents.length,
        quizContentStartAt: null,
      })
    }

    return <Page {...{ quizes, saveQuiz, startEvent }} />
  }
}
export default withUser(withQuizes(Container))
