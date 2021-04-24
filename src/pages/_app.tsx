import type { AppProps } from 'next/app'
import { AuthProvider } from '@/providers/auth'
import insertGapi from '@/lib/gapi'

import { ReactElement, useEffect } from 'react'
import initAuth from '@/lib/firebase-auth'

import 'tailwindcss/tailwind.css'

function App({ Component, pageProps }: AppProps): ReactElement {
  initAuth()
  useEffect(() => {
    insertGapi()
  }, [])
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
