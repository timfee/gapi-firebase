export type SiteUser = {
  meta: {
    displayName: string
    photoUrl: string
    emailVerified: boolean
    lastSeen: {
      _seconds: number
      _nanoseconds: number
    }
    emailAddress: string
  }
  uid: string
  token: any
}
