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
