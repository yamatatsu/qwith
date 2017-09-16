import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import ControllerPage from '../src/components/pages/controller'

storiesOf('Page', module)
  .add('Controller', () => (
    <ControllerPage {...{
      event: { eventTitle: 'テストイベントタイトル' },
      quiz: { quizTitle: 'テストクイズタイトル', quizContents: [] },
      eventStatus: null,
      members: null,
      beginQuiz: action('beginQuiz'),
      continueQuiz: action('continueQuiz'),
      finishQuiz: action('finishQuiz'),
      resetMembers: action('resetMembers'),
      signOut: action('signOut'),
    }} />
  ))
