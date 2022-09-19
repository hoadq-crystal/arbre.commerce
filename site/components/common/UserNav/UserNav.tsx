import cn from 'clsx'
import s from './UserNav.module.css'
import useCart from '@framework/cart/use-cart'
import { useUI } from '@components/ui/context'
import { Heart, Bag, Menu } from '@components/icons'
import CustomerMenuContent from './CustomerMenuContent'
import useCustomer from '@framework/customer/use-customer'
import React from 'react'
import {
  Dropdown,
  DropdownTrigger as DropdownTriggerInst,
  Button,
} from '@components/ui'

import type { LineItem } from '@commerce/types/cart'

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: React.FC<{
  className?: string
}> = ({ className }) => {
  const { data } = useCart()
  const { data: isCustomerLoggedIn } = useCustomer()
  const {
    toggleSidebar,
    closeSidebarIfPresent,
    openModal,
    setSidebarView,
    setModalView,
    openSidebar,
  } = useUI()

  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0
  const DropdownTrigger = isCustomerLoggedIn
    ? DropdownTriggerInst
    : React.Fragment

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        <li className={s.item}>
          <Dropdown>
            <DropdownTrigger>
              <button aria-label="Menu">
                SIGN UP, IT'S FREE
              </button>
            </DropdownTrigger>
            <CustomerMenuContent />
          </Dropdown>
        </li>
        <li className={s.item}>
          <Dropdown>
            <DropdownTrigger>
              <button aria-label="Menu" onClick={() => (isCustomerLoggedIn ? null : openModal())}>
               SIGN IN
              </button>
            </DropdownTrigger>
            <CustomerMenuContent />
          </Dropdown>
        </li>
        <li className={s.mobileMenu}>
          <Button
            className={s.item}
            aria-label="Menu"
            variant="naked"
            onClick={() => {
              setSidebarView('MOBILE_MENU_VIEW')
              openSidebar()
            }}>
            <Menu />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default UserNav
