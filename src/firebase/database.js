// @flow
import firebaseApp from './app'

import type { OwnerType } from '../types'

const ref = firebaseApp.database().ref()

const getOwnerRef = (ownerKey: string) => {
  return ref.child(`owners/${ownerKey}`)
}

export const observeOwner = (ownerKey: string, callback: (owner: OwnerType) => void) => {
  getOwnerRef(ownerKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}

export const setEventStatusQuizKey = (ownerKey: string, eventKey: string, quizKey: string) => {
  getOwnerRef(ownerKey).child('eventStatus').set({ eventKey, quizKey, quizContentIndex: 0 })
}

export const setEventStatusQuizContentIndex = (ownerKey: string, quizContentIndex: number) => {
  getOwnerRef(ownerKey).child('eventStatus/quizContentIndex').set(quizContentIndex)
}
