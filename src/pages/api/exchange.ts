import { Auth } from 'googleapis'
import { getFirebaseAdmin, verifyIdToken } from 'next-firebase-auth'
import initAuth from '@/lib/firebase-auth'
import type { NextApiRequest, NextApiResponse } from 'next'

initAuth()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ error: 'Missing Authorization header value' })
  }
  const token = req.headers.authorization

  try {
    const user = await verifyIdToken(token)
    if (!user) {
      throw Error('No user')
    }

    const firebaseAdmin = getFirebaseAdmin()

    const { code } = req.body

    const oauthClient = new Auth.OAuth2Client(
      process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
      process.env.OAUTH_SECRET,
      'postmessage'
    )

    const { tokens } = await oauthClient.getToken(code)
    await firebaseAdmin.firestore().doc(`/users/${user.id}`).update({
      token: tokens
    })

    return res.status(200).json({ success: true })
  } catch (e) {
    console.error(e)
    return res.status(403).json({ error: true, details: { e } })
  }
}

export default handler
