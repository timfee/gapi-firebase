import Navigation from '@/components/navigation'
import { ReactNode } from 'react'
import cx from 'classnames'
const Layout = ({
  children,
  className
}: {
  children?: ReactNode
  className?: string
}) => {
  return (
    <>
      <Navigation />
      <section
        className={cx(
          'max-w-2xl p-12 mx-auto mt-12 bg-white rounded-lg shadow',
          className
        )}>
        {children}
      </section>
    </>
  )
}

export default Layout
