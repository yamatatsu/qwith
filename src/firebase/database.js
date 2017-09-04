// @flow
import firebaseApp from './app'

import type { EventKeyType, MemberKeyType, OwnerDataType, MemberDataType, EventStatusDataType } from '../types'

const ref = firebaseApp.database().ref()

const getOwnerRef = (ownerKey: string) =>
  ref.child(`owners/${ownerKey}`)

const getEventStatusRef = (eventKey: EventKeyType) =>
  ref.child(`eventStatus/${eventKey.toString()}`)

const getMemberRef = (eventKey: EventKeyType, memberKey: MemberKeyType) =>
  ref.child(`members/${eventKey.toString()}/${memberKey.toString()}`)

export const observeOwner = (ownerKey: string, callback: (owner: OwnerDataType) => void) => {
  getOwnerRef(ownerKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}
export const observeEventStatus = (eventKey: EventKeyType, callback: (eventStatus: EventStatusDataType) => void) => {
  getEventStatusRef(eventKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}
export const observeMember = (eventKey: EventKeyType, memberKey: MemberKeyType, callback: (member: MemberDataType) => void) => {
  getMemberRef(eventKey, memberKey).on('value', (snapshot) => {
    callback(snapshot.val())
  })
}

export const updateEventStatus = (eventKey: EventKeyType, eventStatus: EventStatusDataType) => {
  getEventStatusRef(eventKey).update(eventStatus)
}
export const updateMember = (eventKey: EventKeyType, memberKey: MemberKeyType, member: MemberDataType) => {
  getMemberRef(eventKey, memberKey).update(member)
}

export const pushMember = (eventKey: EventKeyType) => {
  return ref.child(`members/${eventKey.toString()}`).push()
}
