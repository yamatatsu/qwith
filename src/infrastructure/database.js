// @flow
import firebaseApp from './firebase_app'
import Cookies from 'js-cookie'

import type { OwnerKeyType, EventKeyType, MemberKeyType, OwnerDataType, MemberDataType, EventStatusDataType } from '../types'

const ref = firebaseApp.database().ref()

const getOwnerRef = (ownerKey: OwnerKeyType) =>
  ref.child(`owners/${ownerKey.toString()}`)

const getEventStatusRef = (eventKey: EventKeyType) =>
  ref.child(`eventStatus/${eventKey.toString()}`)

const getMemberRef = (eventKey: EventKeyType, memberKey: MemberKeyType) =>
  ref.child(`members/${eventKey.toString()}/${memberKey.toString()}`)

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

const pushMember = (eventKey: EventKeyType) => {
  return ref.child(`members/${eventKey.toString()}`).push()
}

// TODO: Cookie扱っててココにあるべきじゃない気がするけど、domain objectsをどう書くかの構想が立つまで雑に実装
const MEMBER_KEY_COOKIE_NAME = 'mk'
export const getMemberKey = (eventKey: EventKeyType) => {
  const memberKey: MemberKeyType = Cookies.get(MEMBER_KEY_COOKIE_NAME) || pushMember(eventKey).key
  Cookies.set(MEMBER_KEY_COOKIE_NAME, memberKey, { expires: 30 })
  return memberKey
}
