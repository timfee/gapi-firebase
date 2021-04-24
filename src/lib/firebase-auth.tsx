import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/signin',
    appPageURL: '/account',
    loginAPIEndpoint: '/api/signin',
    logoutAPIEndpoint: '/api/signout',
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'slot-fyi',
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
        privateKey: process.env.FIREBASE_ADMIN_KEY
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    },
    cookies: {
      name: 'slot',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: true
    }
  })
}

export default initAuth
