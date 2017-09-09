// @flow
import React, { Component } from 'react'

import type { QuizContentDataType, ChoiceType } from '../../types'

type QuizContentFormType = {
  qText?: string,
  a?: string,
  b?: string,
  c?: string,
  d?: string,
  answerChoice?: ChoiceType,
}
type PropsType = { quizContent?: QuizContentDataType }
type StateType = { quizContent: QuizContentFormType }

export default class QuizContentForm extends Component<PropsType, StateType> {
  constructor({ quizContent }: PropsType)  {
    super()

    if (quizContent) {
      const { qText, a, b, c, d, answerChoice } = quizContent
      this.state = { quizContent: { qText, a, b, c, d, answerChoice } }
    } else {
      this.state = { quizContent: {} }
    }
  }

  render() {
    return <QuizContent quizContent={this.state.quizContent} />
  }
}

const QuizContent = ({ quizContent }: { quizContent: QuizContentFormType }) => (
  <div>
    <div>問題: {quizContent.qText}</div>
    {['a', 'b', 'c', 'd'].map(choice => (
      <div key={choice}>{choice}: {quizContent[choice]}</div>
    ))}
    <div>答え: {quizContent.answerChoice}</div>
    <br/>
  </div>
)
