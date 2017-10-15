// @flow
import * as firebase from 'firebase'
import firebaseApp from './firebase_app'
import Cookies from 'js-cookie'

import type {
  OwnerKeyType,
  QuizKeyType,
  MemberKeyType,

  EventDataType,
  QuizesDataType,
  QuizDataType,
  MemberDataType,
  AnswerDataType
} from '../types'

const ref = firebaseApp.database().ref()

const getOwnerRef = (ownerKey: OwnerKeyType) =>
  ref.child(`owners/${ownerKey}`)

const getQuizesRef = (ownerKey: OwnerKeyType) =>
  getOwnerRef(ownerKey).child('quizes')

const getEventRef = (ownerKey: OwnerKeyType) =>
  getOwnerRef(ownerKey).child('event')

const getMembersRef = (ownerKey: OwnerKeyType) =>
  getOwnerRef(ownerKey).child('members')

const getAnswersRef = (ownerKey: OwnerKeyType) =>
  getOwnerRef(ownerKey).child('answers')


const getMemberRef = (ownerKey: OwnerKeyType, memberKey: MemberKeyType) =>
  getMembersRef(ownerKey).child(memberKey)

export const observeQuizes = (ownerKey: OwnerKeyType, callback: (quizes: QuizesDataType) => void) => {
  return getQuizesRef(ownerKey).on('value', (snapshot) => {
    snapshot && callback(snapshot.val())
  })
}
export const observeEvent = (ownerKey: OwnerKeyType, callback: (event: EventDataType) => void) => {
  return getEventRef(ownerKey).on('value', (snapshot) => {
    snapshot && callback(snapshot.val())
  })
}
// export const observeMembers = (ownerKey: OwnerKeyType, callback: (member: MembersDataType) => void) => {
//   getMembersRef(ownerKey).on('value', (snapshot) => {
//     snapshot && callback(snapshot.val())
//   })
// }
export const observeMember = (ownerKey: OwnerKeyType, memberKey: MemberKeyType, callback: (member: MemberDataType) => void) => {
  return getMemberRef(ownerKey, memberKey).on('value', (snapshot) => {
    snapshot && callback(snapshot.val())
  })
}

export const setQuiz = (ownerKey: OwnerKeyType, quizKey: QuizKeyType, quiz: QuizDataType) => {
  getOwnerRef(ownerKey).child(`quizes/${quizKey}`).set(quiz)
}
export const createQuiz = (ownerKey: OwnerKeyType, quiz: QuizDataType) => {
  const quizKey = genNewQuizKey(ownerKey)
  setQuiz(ownerKey, quizKey, quiz)
}
export const setEvent = (ownerKey: OwnerKeyType, event: EventDataType) => {
  getEventRef(ownerKey).set(event)
}
export const resetEvent = (ownerKey: OwnerKeyType) => {
  getEventRef(ownerKey).set(null)
  getMembersRef(ownerKey).set(null)
}
export const setMember = (ownerKey: OwnerKeyType, memberKey: MemberKeyType, member: MemberDataType) => {
  getMemberRef(ownerKey, memberKey).set(member)
}
export const setAnswer = (ownerKey: OwnerKeyType, answer: AnswerDataType) => {
  getAnswersRef(ownerKey).set(answer)
}

const genNewQuizKey = (ownerKey: OwnerKeyType): QuizKeyType => {
  return getQuizesRef(ownerKey).push().key
}

const pushMember = (ownerKey: OwnerKeyType) => {
  return getMembersRef(ownerKey).push()
}

// TODO: Cookie扱っててココにあるべきじゃない気がするけど、domain objectsをどう書くかの構想が立つまで雑に実装
const MEMBER_KEY_COOKIE_NAME = 'mk'
export const getMemberKey = (ownerKey: OwnerKeyType) => {
  const memberKey: MemberKeyType = Cookies.get(MEMBER_KEY_COOKIE_NAME) || pushMember(ownerKey).key
  Cookies.set(MEMBER_KEY_COOKIE_NAME, memberKey, { expires: 30 })
  return memberKey
}

export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP
