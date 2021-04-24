/// <reference types="next" />
/// <reference types="next/types/global" />

import { nookies } from 'nookies'

declare global {
  interface Window {
    gapi: typeof gapi
    nookies: typeof nookies
    firebase: any
    gapiCallback: any
  }
}
