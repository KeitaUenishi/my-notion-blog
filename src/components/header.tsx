'use client'

import { usePathname } from "next/navigation"
import Link from 'next/link'
import styles from 'styles/header.module.css'

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
    <header className={styles.header}>
      <ul>
        {navItems.map(({ label, path }) => (
          <li key={label}>
            <Link href={path} className={pathname === path ? 'active' : null}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
