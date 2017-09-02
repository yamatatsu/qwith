const provider = new firebase.auth.GoogleAuthProvider()

const signInWithPopup = () =>
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      return result.user
    }).catch(function(error) {
      const { errorCode, errorMessage, email, credential } = error
      console.error(`auth error: ${{ errorCode, errorMessage, email, credential }}`)
    })

export default signInWithPopup
