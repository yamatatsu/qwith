// @flow
import * as firebase from 'firebase'
import firebaseApp from './firebase_app'

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
type Callback<D> = (obj: D) => void

const getOwnerRef = (ownerKey: OwnerKeyType) =>
  firebaseApp.database().ref(`owners/${ownerKey}`)


export const getEventDb = (ownerKey: OwnerKeyType) => {
  const ref = getOwnerRef(ownerKey).child('event')

  return {
    subscribe: (callback: Callback<EventDataType>) => {
      return ref.on('value', (snapshot) => {
        snapshot && callback(snapshot.val())
      })
    },
    unsubscribe: () => ref.off('value'),
    set: (event: EventDataType) => ref.set(event),
    deleteAll: () => ref.set(null),
  }
}

export const getQuizesDb = (ownerKey: OwnerKeyType) => {
  const ref = getOwnerRef(ownerKey).child('quizes')

  const set = (quizKey: QuizKeyType, quiz: QuizDataType) => {
    ref.child(quizKey).set(quiz)
  }
  const genNewQuizKey = (): QuizKeyType => ref.push().key

  return {
    subscribe: (callback: Callback<QuizesDataType>) => {
      return ref.on('value', (snapshot) => {
        snapshot && callback(snapshot.val())
      })
    },
    unsubscribe: () => ref.off('value'),
    set,
    create: (quiz: QuizDataType) => set(genNewQuizKey(), quiz),
  }
}

export const getMembersDb = (ownerKey: OwnerKeyType) => {
  const ref = getOwnerRef(ownerKey).child('members')

  return {
    createKey: () => ref.push().key,
    deleteAll: () => ref.set(null),
  }
}

export const getMemberDb = (ownerKey: OwnerKeyType, memberKey: MemberKeyType) => {
  const ref = getOwnerRef(ownerKey).child('members').child(memberKey)

  return {
    subscribe: (callback: Callback<MemberDataType>) => {
      return ref.on('value', (snapshot) => {
        snapshot && callback(snapshot.val())
      })
    },
    unsubscribe: () => ref.off('value'),
    set: (member: MemberDataType) => ref.set(member),
  }
}

export const getAnswerDb = (ownerKey: OwnerKeyType) => {
  const ref = getOwnerRef(ownerKey).child('answers')

  return {
    set: (answer: AnswerDataType) => ref.set(answer),
  }
}

export const TIMESTAMP = firebase.database.ServerValue.TIMESTAMP
