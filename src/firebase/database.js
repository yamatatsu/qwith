// @flow
import firebaseApp from './app'

import type { EventKeyType, MemberKeyType, OwnerType, EventStatusType, QuizContentType, ChoiceType } from '../types'

const ref = firebaseApp.database().ref()

const getOwnerRef = (ownerKey: string) => {
  return ref.child(`owners/${ownerKey}`)
}
export const observeOwner = (ownerKey: string, callback: (owner: OwnerType) => void) => {
  getOwnerRef(ownerKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}

const getEventStatusRef = (eventKey: EventKeyType) => {
  return ref.child(`eventStatus/${eventKey.toString()}`)
}
export const observeEventStatus = (eventKey: EventKeyType, callback: (eventStatus: EventStatusType) => void) => {
  getEventStatusRef(eventKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}
export const setEventStatusQuiz = (eventKey: EventKeyType, quizContentIndex: number, quizContent: QuizContentType) => {
  getEventStatusRef(eventKey).update({ quizContentIndex, quizContent })
}

export const setAnswer = (eventKey: EventKeyType, memberKey: MemberKeyType, quizContentIndex: number, choice: ChoiceType) => {
  getEventStatusRef(eventKey).child(`members/${memberKey.toString()}/quiz/answers/${quizContentIndex}`).set(choice)
}
export const pushMember = (eventKey: EventKeyType) => {
  return getEventStatusRef(eventKey).child(`members`).push()
}
