import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import ControllerPage from '../src/components/pages/controller'

storiesOf('【Page】Controller', module)
  .add('クイズtab', () => <ControllerPage {...{ eventKey, event, quiz, eventStatus, members, tabIndex: 0, ...actions }} />)
  .add('割合tab', () => <ControllerPage {...{ eventKey, event, quiz, eventStatus, members, tabIndex: 1, ...actions }} />)
  .add('回答tab', () => <ControllerPage {...{ eventKey, event, quiz, eventStatus, members, tabIndex: 2, ...actions }} />)
  .add('順位tab', () => <ControllerPage {...{ eventKey, event, quiz, eventStatus, members, tabIndex: 3, ...actions }} />)

const eventKey = 'test_event_key'
const event = { eventTitle: 'テスト イベント' }
const quiz = {
  quizTitle: 'テスト クイズ',
  quizContents: [
    {
      qText: "出会いはいつ？",
      a: "2017-01-01",
      b: "2016-01-01",
      c: "2015-01-01",
      d: "2014-01-01",
      correctChoice: "a",
      uid: "quizContentUid00",
    }, {
      qText: "新郎の好きな食べ物は？",
      a: "りんご",
      b: "ごりら",
      c: "らっぱ",
      d: "ぱんつ",
      correctChoice: "a",
      uid: "quizContentUid01",
    }, {
      qText: "二人が出会った場所は？",
      a: "新宿",
      b: "品川",
      c: "上野",
      d: "あの日あの時あの場所で",
      correctChoice: "d",
      uid: "quizContentUid03",
    },
  ]
}
const eventStatus = {
  quizContentIndex: 1,
  quizContent: {
    qText: "出会いはいつ？",
    a: "2017-01-01",
    b: "2016-01-01",
    c: "2015-01-01",
    d: "2014-01-01",
    correctChoice: "a",
    uid: "quizContentUid00",
  },
  quizContentIndexMax: 2,
  quizContentStartAt: 1000,
}
const members = {
  member_key01: { nickname: '01郎', quiz: { answers: [{ choice: 'a', answeredAt: 1111 }, { choice: 'b', answeredAt: 1111 }] } },
  member_key02: { nickname: '02郎', quiz: { answers: [{ choice: 'b', answeredAt: 2222 }, { choice: 'a', answeredAt: 2222 }] } },
  member_key03: { nickname: '03郎', quiz: { answers: [{ choice: 'c', answeredAt: 3333 }, { choice: 'c', answeredAt: 3333 }] } },
  member_key04: { nickname: '04郎', quiz: { answers: [{ choice: 'd', answeredAt: 4444 }, { choice: 'a', answeredAt: 4444 }] } },
  member_key05: { nickname: '05郎', quiz: { answers: [{ choice: 'a', answeredAt: 5555 }, { choice: 'c', answeredAt: 5555 }] } },
  member_key06: { nickname: '06郎', quiz: { answers: [{ choice: 'b', answeredAt: 6666 }, { choice: 'a', answeredAt: 6666 }] } },
  member_key07: { nickname: '07郎', quiz: { answers: [{ choice: 'c', answeredAt: 7777 }, { choice: 'd', answeredAt: 7777 }] } },
  member_key08: { nickname: '08郎', quiz: { answers: [{ choice: 'd', answeredAt: 8888 }, { choice: 'a', answeredAt: 8888 }] } },
  member_key09: { nickname: '09郎', quiz: { answers: [{ choice: 'a', answeredAt: 9999 }, { choice: 'd', answeredAt: 9999 }] } },
  member_key10: { nickname: '10郎', quiz: { answers: [{ choice: 'b', answeredAt: 11110 }] } },
}
const actions = {
  beginQuiz: action('beginQuiz'),
  continueQuiz: action('continueQuiz'),
  finishQuiz: action('finishQuiz'),
  resetMembers: action('resetMembers'),
  signOut: action('signOut'),
  changeTabIndex: action('changeTabIndex'),
}
