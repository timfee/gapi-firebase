import { FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { KeyIcon } from '@heroicons/react/outline'
import cx from 'classnames'
import { useRouter } from 'next/router'

import { useAuthUser, withAuthUser } from 'next-firebase-auth'
import Link from 'next/link'

const Navigation: FC = () => {
  const router = useRouter()

  const authUser = useAuthUser()

  const navItems = [
    {
      title: 'Public Access',
      route: '/'
    },
    {
      title: 'Sign in Page',
      route: '/signin'
    },
    {
      title: 'Signed In Access',
      route: '/account'
    }
  ]

  return (
    <nav className="bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className=" flex space-x-8">
              {navItems.map((item) => (
                <Link key={item.route} href={item.route}>
                  <a
                    className={cx(
                      'inline-flex items-center px-1 pt-1 text-sm border-b-2',
                      {
                        'border-indigo-500 font-medium text-gray-900':
                          router.pathname === item.route,
                        'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                          router.pathname !== item.route
                      }
                    )}>
                    {item.title}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Menu as="div" className="relative ml-3">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex text-sm bg-white rounded-full">
                      <span className="sr-only">Open user menu</span>
                      {authUser.firebaseUser && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src={authUser.firebaseUser.photoURL}
                          alt=""
                        />
                      )}
                      {!authUser.firebaseUser && (
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full">
                          <KeyIcon className="h-4 text-white" />
                        </div>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      static
                      className="ring-1 ring-black ring-opacity-5 focus:outline-none absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg">
                      {authUser.firebaseUser && (
                        <Menu.Item>
                          <a
                            href="#"
                            onClick={() => {
                              authUser.signOut().then(() => {
                                router.push('/')
                              })
                            }}
                            className="block px-4 py-2 text-sm text-gray-700">
                            Sign out
                          </a>
                        </Menu.Item>
                      )}
                      {!authUser.firebaseUser && (
                        <Menu.Item>
                          <a
                            href="/signin"
                            className="block px-4 py-2 text-sm text-gray-700">
                            Sign in
                          </a>
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withAuthUser({})(Navigation)
