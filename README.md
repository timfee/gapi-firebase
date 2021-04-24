# gapi-firebase

Uses [next-firebase-auth](https://github.com/gladly-team/next-firebase-auth) to
authenticate users with Google, and use the credential with Firebase.

This allows you to use `gapi` to call
`gapi.auth2.getAuthInstance().grantOfflineAccess()` to obtain a `code` and
exchange it for a token you can store for future offline use.

![Walthrough](public/example.gif)
