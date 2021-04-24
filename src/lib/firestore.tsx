/**
 * These are my rules for the /users/ collection:
 *
 *
 *  rules_version = '2';
 *  service cloud.firestore {
 *    match /databases/{database}/documents {
 *      match /users/{user} {
 *        allow create: if request.auth.uid == request.resource.data.uid && request.resource.data.uid == user
 *        allow read, update: if request.auth != null  && resource.data.uid == user
 *
 *        match /logins/{login} {
 *        	allow create: if request.auth.uid == user
 *        }
 *      }
 *    }
 *  }
 */
import firebase from '@/lib/firebase'

export const noop = (): boolean => {
  return false
}
export const processLogin = (user: firebase.User): void => {
  firebase
    .firestore()
    .doc(`/users/${user.uid}`)
    .set({
      uid: user.uid,
      meta: {
        displayName: user.displayName,
        emailAddress: user.email,
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL,
        lastSeen: new Date()
      }
    })
    .then(() => {
      firebase
        .firestore()
        .doc(`/users/${user.uid}`)
        .collection('logins')
        .doc(new Date().getTime().toString())
        .set({
          timestamp: new Date(),
          userAgent: window.navigator.userAgent
        })
    })
}
