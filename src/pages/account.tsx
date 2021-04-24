import Account from '@/layouts/layout'
import { SiteUser } from '@/models/user'
import firebaseClient from '@/lib/firebase'
import cx from 'classnames'
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Auth = () => {
  const authUser = useAuthUser()
  const user = authUser.id
  const [userData, setUserData] = useState<SiteUser>()
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const exchangeCode = async (code) => {
    const endpoint = window.location.host.indexOf('localhost')
      ? 'https://'
      : 'http://' + window.location.host + '/api/exchange'

    const token = await authUser.getIdToken()
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ code })
    })
    const data: { success?: boolean; error?: boolean } = await response.json()
    if (data.success) {
      updateUserData()
    } else {
      alert('Error')
    }
  }

  const updateUserData = async () => {
    if (authUser.firebaseUser) {
      const doc = (
        await firebaseClient
          .firestore()
          .doc('/users/' + user)
          .get()
      ).data()
      if (doc.token && doc.token.refresh_token) {
        doc.token.access_token = '<redacted>'
        doc.token.refresh_token = '<redacted>'
        doc.token.id_token = '<redacted>'
      }
      setUserData(JSON.parse(JSON.stringify(doc)))
    }
  }

  useEffect(() => {
    updateUserData()
  }, [authUser.clientInitialized])
  return (
    <Account>
      {userData && (
        <div className="sm:px-6 lg:px-8 container px-4 mx-auto my-12">
          {!userData.token && (
            <button
              className={cx(
                'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                { 'opacity-50': isButtonDisabled }
              )}
              disabled={isButtonDisabled}
              onClick={() => {
                setButtonDisabled(true)
                window.gapi.auth2
                  .getAuthInstance()
                  .grantOfflineAccess()
                  .then(({ code }) => {
                    exchangeCode(code)
                    setButtonDisabled(false)
                  })
                  .catch((e) => {
                    alert("This didn't work:\n\n" + JSON.stringify(e))
                    setButtonDisabled(false)
                  })
              }}>
              Allow Offline Access
              {isButtonDisabled && ' in progress'}
            </button>
          )}
          {userData.token && (
            <button
              className={cx(
                'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
                { 'opacity-50': isButtonDisabled }
              )}
              disabled={isButtonDisabled}
              onClick={() => {
                setButtonDisabled(true)
                firebaseClient
                  .firestore()
                  .doc(`/users/${user}`)
                  .update({
                    token: firebaseClient.firestore.FieldValue.delete()
                  })
                  .then(() => {
                    updateUserData()
                  })
                  .finally(() => {
                    setButtonDisabled(false)
                  })
              }}>
              Revoke Offline Access
            </button>
          )}

          <h3 className="font-lg mt-12 font-bold">Your user data</h3>
          <pre className="text-xs">
            {JSON.stringify(userData, null, 4).replace(
              /(https:\/\/www.googleapis.com\/auth\/)/gi,
              ''
            )}
          </pre>
        </div>
      )}
    </Account>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Auth)
