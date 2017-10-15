// @flow
import React, { Component } from 'react'
import { setQuiz, createQuiz, setEvent } from '../infrastructure/database'
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

    const saveQuiz = (quizKey?: QuizKeyType) => (quiz: QuizDataType) => {
      if (quizKey) {
        setQuiz(ownerKey, quizKey, quiz)
      } else {
        createQuiz(ownerKey, quiz)
      }
    }

    const startEvent = (quizKey: QuizKeyType, quiz: QuizDataType) => () =>{
      setEvent(ownerKey, {
        status: 'not_started',
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
