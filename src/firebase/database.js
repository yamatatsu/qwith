// @flow
import firebaseApp from './app'

import type { OwnerType, EventStatusType, QuizContentType, ChoiceType } from '../types'

const ref = firebaseApp.database().ref()

const getOwnerRef = (ownerKey: string) => {
  return ref.child(`owners/${ownerKey}`)
}
export const observeOwner = (ownerKey: string, callback: (owner: OwnerType) => void) => {
  getOwnerRef(ownerKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}

const getEventStatusRef = (eventKey: string) => {
  return ref.child(`eventStatus/${eventKey}`)
}
export const observeEventStatus = (eventKey: string, callback: (eventStatus: EventStatusType) => void) => {
  getEventStatusRef(eventKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}
export const setEventStatusQuiz = (eventKey: string, quizKey: string, quizContent: QuizContentType) => {
  getEventStatusRef(eventKey).update({ quizKey, quizContentIndex: 0, quizContent })
}
export const setEventStatusQuizContent = (eventKey: string, quizContentIndex: number, quizContent: QuizContentType) => {
  getEventStatusRef(eventKey).update({ quizContentIndex, quizContent })
}

export const setAnswer = (eventKey: string, memberKey: string, quizKey: string, quizContentIndex: number, choice: ChoiceType) => {
  getEventStatusRef(eventKey).child(`members/${memberKey}/answers/${quizKey}/${quizContentIndex}`).set(choice)
}
export const pushMember = (eventKey: string) => {
  return getEventStatusRef(eventKey).child(`members`).push()
}
