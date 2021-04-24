import { useAuth } from '@/providers/auth'
import { UserCircleIcon } from '@heroicons/react/solid'
import { AuthAction, withAuthUser } from 'next-firebase-auth'
import { FC } from 'react'
import Layout from '@/layouts/layout'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SignIn: FC = ({ children }: { children: never }) => {
  const auth = useAuth()

  return (
    <Layout className="text-center">
      <UserCircleIcon className="w-24 mx-auto mb-3 text-indigo-500" />
      <p className="text-xl font-bold text-indigo-500">Sign in</p>
      <p className="my-6">
        Please sign in with your Google Account to continue
      </p>
      <button
        type="button"
        className="hover:bg-gray-50 inline-flex items-baseline justify-center px-4 py-2 font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm"
        onClick={auth.signIn.bind(this, true)}>
        <span className="font-google mr-2 font-black">G</span> Sign in
      </button>
    </Layout>
  )
}

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(SignIn)
