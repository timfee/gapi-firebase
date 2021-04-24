const insertGapi = (gapiCallback?: () => void) => {
  const script = document.createElement('script')
  script.src = 'https://apis.google.com/js/platform.js'
  script.async = true
  script.defer = true
  script.onload = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
          scope: process.env.NEXT_PUBLIC_OAUTH_SCOPES,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
        })
        .then(() => {
          if (gapiCallback) gapiCallback()
        })
    })
  }
  document.head.appendChild(script)
}
export default insertGapi
