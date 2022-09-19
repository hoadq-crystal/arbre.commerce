import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import {Logo, Container, Button} from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import {UIContext} from "@components/ui/context";

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

function showModalLogin() {
  UIContext.Provider
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className={s.nav}>
        <div className="flex items-center flex-1">
          <Link href="/">
            <a aria-label="Logo">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="flex items-center justify-end flex-1 space-x-8">
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>HOME</a>
            </Link>
            <Link href="/search">
              <a className={s.link}>MARKETPLACE</a>
            </Link>
          </nav>
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar
