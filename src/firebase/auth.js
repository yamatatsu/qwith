// @flow
import * as firebase from 'firebase'
import firebaseApp from './app'

import type { UserType } from '../types'

const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebaseApp.auth()

const signInWithPopup = () =>
  auth.signInWithPopup(provider)
    .then(function(result) {
      return result.user
    }).catch(function(error) {
      const { errorCode, errorMessage, email, credential } = error
      console.error(`auth error. errorCode: ${errorCode}, errorMessage: ${errorMessage}, email: ${email}, credential: ${credential}`)
    })

type CallbackType = (props: UserType) => void
const observe = (callback: CallbackType) => {
  auth.onAuthStateChanged(callback)
}

export { signInWithPopup, observe }
