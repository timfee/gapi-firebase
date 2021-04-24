import firebaseClient from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
}

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  window.firebase = firebaseClient
  firebaseClient.initializeApp(CLIENT_CONFIG)
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION)
}

export default firebaseClient
