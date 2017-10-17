// @flow
import * as firebase from 'firebase'
import firebaseApp from './firebase_app'

import type { UserType } from '../types'

const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebaseApp.auth()

const signInWithPopup = () =>
  auth.signInWithPopup(provider)
    .then((result) => result.user)
    .catch((error) => {
      const { errorCode, errorMessage, email, credential } = error
      console.error(`auth error. errorCode: ${errorCode}, errorMessage: ${errorMessage}, email: ${email}, credential: ${credential}`)
    })

const signOut = () => auth.signOut()

type CallbackType = (user: ?UserType) => void
const observeAuth = (callback: CallbackType) => {
  auth.onAuthStateChanged(callback)
}

export { signInWithPopup, signOut, observeAuth }
