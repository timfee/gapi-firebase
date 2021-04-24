import React, { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import firebaseClient from '@/lib/firebase'

import { processLogin } from '@/lib/firestore'

type AuthContextType = {
  signIn?: (interactive?: boolean) => Promise<unknown>
  signOut?: () => Promise<unknown>
  user?: firebaseClient.User
}

const AuthContext = createContext<AuthContextType>(null)

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<firebaseClient.User>(null)
  const signInFromGapi = async (interactive = true) => {
    return new Promise<void>((resolve, reject) => {
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        const {
          id_token,
          access_token
        } = window.gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getAuthResponse(true)

        const credential = firebaseClient.auth.GoogleAuthProvider.credential(
          id_token,
          access_token
        )

        firebaseClient
          .auth()
          .signInWithCredential(credential)
          .then(({ user }) => {
            if (interactive) processLogin(user)
            resolve()
          })
          .catch((e) => {
            reject(e)
          })
      } else {
        setUser(null)
        resolve()
      }
    })
  }

  const signOut = async () => {
    window.gapi.auth2.getAuthInstance().signOut()
    firebaseClient
      .auth()
      .signOut()
      .then(() => {
        setUser(null)
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', { path: '/' })
        document.location.reload()
      })
  }

  const signIn = async () => {
    return new Promise((resolve, reject) => {
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(signInFromGapi.bind(this, [true]))
        .then(resolve)
        .catch(reject)
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.nookies = nookies
    }
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)

        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', { path: '/' })
        return
      }

      const token = await user.getIdToken()
      setUser(user)

      nookies.destroy(null, 'token')
      nookies.set(null, 'token', token, { path: '/' })
    })
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
