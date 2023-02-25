'use client'

import { usePathname } from "next/navigation"
import Link from 'next/link'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { label: 'Top', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Profile', path: '/blog' },
    { label: 'Contact', path: '/blog' },
  ]

  return (
    <header className="bg-base-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center">
          {navItems.map((item, idx) => {
            return (
              <Link
                key={idx}
                href={item.path}
                className="mr-8 hover:text-gray-300 normal-case text-xl"
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header
