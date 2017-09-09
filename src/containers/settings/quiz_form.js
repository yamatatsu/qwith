// @flow
import React, { Component } from 'react'

import type { QuizDataType } from '../../types'

type QuizFormType = { quizTitle?: string }
type PropsType = { quiz: QuizDataType }
type StateType = { quiz: QuizFormType }

export default class QuizForm extends Component<PropsType, StateType> {
  constructor({ quiz }: PropsType) {
    super()

    const { quizTitle } = quiz
    this.state = { quiz: { quizTitle } }
  }

  render() {
    return <Quiz quiz={this.state.quiz} />
  }
}

const Quiz = ({ quiz }: { quiz: QuizFormType }) => (
  <div>
    {quiz.quizTitle}
  </div>
)
