import Layout from '@/layouts/layout'
import Link from 'next/link'
import { PuzzleIcon } from '@heroicons/react/outline'
const Home = () => {
  return (
    <Layout className="text-center">
      <PuzzleIcon className="w-24 mx-auto mb-3 text-green-600" />
      <p className="text-xl font-medium text-green-600">Example App</p>
      <p className="my-6">This is a public page.</p>
      <Link href="/account">
        <a className="hover:border-green-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 bg-green-50 inline-flex items-center px-6 py-3 text-base font-medium text-green-700 border border-transparent rounded-md">
          Go to the Signed In area of the site
        </a>
      </Link>
    </Layout>
  )
}
export default Home
