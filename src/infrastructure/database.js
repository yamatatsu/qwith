// @flow
import * as firebase from 'firebase'
import 'firebase/firestore'
import genUUID from 'uuid/v4'
import firebaseApp from './firebase_app'

import type {
  OwnerKeyType,
  QuizKeyType,
  MemberKeyType,

  OwnerDataType,
  EventDataType,
  QuizesDataType,
  QuizDataType,
  MemberDataType,
  AnswerDataType
} from '../types'

type CallbackType<D> = (data: D) => void
type SubscriptionType<D> = {
  subscribe: (callback: CallbackType<D>) => any,
  unsubscribe: () => any,
}

const getOwnerDocRef = (ownerKey: OwnerKeyType) =>
  firebaseApp.firestore().collection('owners').doc(ownerKey)

const genSubscription = (ref): Object => ({
  subscribe: (callback) => ref.onSnapshot(
    snapshot => {
      if (!snapshot) return

      if (snapshot.data) {
        snapshot.exists && callback(snapshot.data())
      } else {
        const docs = []
        snapshot.forEach(doc => docs.push(doc.data()))
        callback(docs)
      }
    },
  ),
  unsubscribe: () => ref.onSnapshot(() => {}),
})

export const getOwnerDb = (ownerKey: OwnerKeyType) => {
  const docRef = getOwnerDocRef(ownerKey)
  const subscription: SubscriptionType<OwnerDataType> = genSubscription(docRef)

  return {
    ...subscription,
    setEvent: (event: EventDataType) => docRef.update({ event }),
    deleteEvent: () => docRef.update({ event: firebase.firestore.FieldValue.delete() }),
  }
}

export const getQuizesDb = (ownerKey: OwnerKeyType) => {
  const collectionRef = getOwnerDocRef(ownerKey).collection('quizes')
  const subscription: SubscriptionType<QuizesDataType> = genSubscription(collectionRef)

  const fillUid = (quiz: QuizDataType) => ({
    ...quiz,
    quizContents: quiz.quizContents && quiz.quizContents.map(c => ({
      ...c,
      uid: c.uid || genUUID(),
    })),
  })

  return {
    ...subscription,
    set: (quizKey: QuizKeyType, quiz: QuizDataType) => {
      collectionRef.doc(quizKey).set(fillUid(quiz))
    },
    add: (quiz: QuizDataType) => {
      collectionRef.add(fillUid(quiz))
    },
  }
}

export const getMembersDb = (ownerKey: OwnerKeyType) => {
  const collectionRef = getOwnerDocRef(ownerKey).collection('members')

  return {
    deleteAll: () => collectionRef.set(null),
  }
}

export const getMemberDb = (ownerKey: OwnerKeyType, memberKey: MemberKeyType) => {
  const docRef = getOwnerDocRef(ownerKey).collection('members').doc(memberKey)
  const subscription: SubscriptionType<MemberDataType> = genSubscription(docRef)

  return {
    ...subscription,
    set: (member: MemberDataType) => {
      docRef.set(member)
    },
  }
}

export const getAnswerDb = (ownerKey: OwnerKeyType) => {
  const collectionRef = getOwnerDocRef(ownerKey).collection('answers')

  return {
    set: (answer: AnswerDataType) => {
      collectionRef.add(answer)
    },
  }
}

export const TIMESTAMP = firebase.firestore.FieldValue.serverTimestamp()
