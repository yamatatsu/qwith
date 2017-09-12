// @flow
import * as firebase from 'firebase'
import firebaseApp from './firebase_app'
import Cookies from 'js-cookie'

import type {
  OwnerKeyType,
  EventKeyType,
  MemberKeyType,

  OwnerDataType,
  EventDataType,
  QuizDataType,
  MembersDataType,
  MemberDataType,
  EventStatusDataType,
  AnswerDataType
} from '../types'

const ref = firebaseApp.database().ref()

const getOwnerRef = (ownerKey: OwnerKeyType) =>
  ref.child(`owners/${ownerKey}`)

const getEventStatusRef = (eventKey: EventKeyType) =>
  ref.child(`eventStatus/${eventKey}`)

const getMembersRef = (eventKey: EventKeyType) =>
  ref.child(`members/${eventKey}`)

const getMemberRef = (eventKey: EventKeyType, memberKey: MemberKeyType) =>
  getMembersRef(eventKey).child(`${memberKey}`)

const getAnswersRef = (eventKey: EventKeyType, memberKey: MemberKeyType) =>
  getMemberRef(eventKey, memberKey).child(`quiz/answers`)

export const observeOwner = (ownerKey: OwnerKeyType, callback: (owner: OwnerDataType) => void) => {
  getOwnerRef(ownerKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}
export const observeEventStatus = (eventKey: EventKeyType, callback: (eventStatus: EventStatusDataType) => void) => {
  getEventStatusRef(eventKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}
export const observeMembers = (eventKey: EventKeyType, callback: (member: MembersDataType) => void) => {
  getMembersRef(eventKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}
export const observeMember = (eventKey: EventKeyType, memberKey: MemberKeyType, callback: (member: MemberDataType) => void) => {
  getMemberRef(eventKey, memberKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}

export const setEvent = (ownerKey: OwnerKeyType, eventKey: EventKeyType, event: EventDataType) => {
  getOwnerRef(ownerKey).child(`events/${eventKey}`).set(event)
}
export const addEvent = (ownerKey: OwnerKeyType, event: EventDataType) => {
  const eventKey: EventKeyType = getOwnerRef(ownerKey).child(`events`).push().key
  setEvent(ownerKey, eventKey, event)
}
export const setQuiz = (ownerKey: OwnerKeyType, eventKey: EventKeyType, quiz: QuizDataType) => {
  getOwnerRef(ownerKey).child(`quizes/${eventKey}`).set(quiz)
}
export const setEventStatus = (eventKey: EventKeyType, eventStatus: EventStatusDataType) => {
  getEventStatusRef(eventKey).set(eventStatus)
}
export const resetEventStatus = (eventKey: EventKeyType) => {
  getEventStatusRef(eventKey).set(null)
}
export const setMember = (eventKey: EventKeyType, memberKey: MemberKeyType, member: MemberDataType) => {
  getMemberRef(eventKey, memberKey).set(member)
}
export const setAnswer = (eventKey: EventKeyType, memberKey: MemberKeyType, quizContentIndex: number, answer: AnswerDataType) => {
  getAnswersRef(eventKey, memberKey).update({ [quizContentIndex]: answer })
}
export const resetMembers = (eventKey: EventKeyType) => {
  getMembersRef(eventKey).set(null)
}

const pushMember = (eventKey: EventKeyType) => {
  return getMembersRef(eventKey).push()
}

// TODO: Cookie扱っててココにあるべきじゃない気がするけど、domain objectsをどう書くかの構想が立つまで雑に実装
const MEMBER_KEY_COOKIE_NAME = 'mk'
export const getMemberKey = (eventKey: EventKeyType) => {
  const memberKey: MemberKeyType = Cookies.get(MEMBER_KEY_COOKIE_NAME) || pushMember(eventKey).key
  Cookies.set(MEMBER_KEY_COOKIE_NAME, memberKey, { expires: 30 })
  return memberKey
}

export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP
