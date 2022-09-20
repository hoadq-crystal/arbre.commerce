import cn from 'clsx'
import s from './Layout.module.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CommerceProvider } from '@framework'
import LoginView from '@components/auth/LoginView'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import ShippingView from '@components/checkout/ShippingView'
import CartSidebarView from '@components/cart/CartSidebarView'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import {Sidebar, Button, LoadingDots, Dropdown, DropdownTrigger as DropdownTriggerInst} from '@components/ui'
import PaymentMethodView from '@components/checkout/PaymentMethodView'
import CheckoutSidebarView from '@components/checkout/CheckoutSidebarView'
import { CheckoutProvider } from '@components/checkout/context'
import { MenuSidebarView } from '@components/common/UserNav'
import type { Page } from '@commerce/types/page'
import type { Category } from '@commerce/types/site'
import type { Link as LinkProps } from '../UserNav/MenuSidebarView'
import useCustomer from "@framework/customer/use-customer";
import CustomerMenuContent from "../UserNav/CustomerMenuContent";
import React from "react";

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: Loading,
}

const SignUpView = dynamic(() => import('@components/auth/SignUpView'), {
  ...dynamicProps,
})

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  {
    ...dynamicProps,
  }
)

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ...dynamicProps,
})

const Modal = dynamic(() => import('@components/ui/Modal'), {
  ...dynamicProps,
  ssr: false,
})

interface Props {
  pageProps: {
    pages?: Page[]
    categories: Category[]
  }
}

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignUpView />}
      {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
    </Modal>
  )
}

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI()
  return displayModal ? (
    <ModalView modalView={modalView} closeModal={closeModal} />
  ) : null
}

const SidebarView: React.FC<{
  sidebarView: string
  closeSidebar(): any
  links: LinkProps[]
}> = ({ sidebarView, closeSidebar, links }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === 'CART_VIEW' && <CartSidebarView />}
      {sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
      {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
      {sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />}
      {sidebarView === 'MOBILE_MENU_VIEW' && <MenuSidebarView links={links} />}
    </Sidebar>
  )
}

const SidebarUI: React.FC<{ links: LinkProps[] }> = ({ links }) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI()
  return displaySidebar ? (
    <SidebarView
      links={links}
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
    />
  ) : null
}

const Layout: React.FC<Props> = ({
  children,
  pageProps: { categories = [], ...pageProps },
}) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()
  // const { data: isCustomerLoggedIn } = useCustomer()
  const {
    openModal,
  } = useUI()
  // const DropdownTrigger = isCustomerLoggedIn
  //   ? DropdownTriggerInst
  //   : React.Fragment
  return (
    <CommerceProvider locale={locale}>
      <div className="home-container">
        <div className="home-home">
          <div className="home-nav">
            <div className="home-logo">
              <img
                src="/assets/iconsi628-paa.svg"
                alt="iconsI628"
                className="home-icons"
              />
              <span className="home-text">
                <span>ARBRE</span>
              </span>
            </div>
            <div className="home-menubutton">
              <div className="home-menu">
                <div className="home-itemlink">
                  <span className="home-text02">
                    <span>Home</span>
                  </span>
                </div>
                <div className="home-itemlink1">
                  <span className="home-text04">
                    <span>Marketplace</span>
                  </span>
                </div>
              </div>
              <div className="home-buttons">
                <button className="home-button">
                  <span className="home-text06">
                    <span>SIGN UP, IT’S FREE</span>
                  </span>
                </button>
                <button className="home-button1">
                  <span className="home-text08">
                    <Dropdown>
                      {/*<DropdownTrigger>*/}
                        <span onClick={() => (openModal())}>SIGN IN</span>
                      {/*</DropdownTrigger>*/}
                    </Dropdown>
                    {/*<span>SIGN IN</span>*/}
                  </span>
                </button>
              </div>
            </div>
          </div>
          {children}
          <Footer pages={pageProps.pages} />
          <ModalUI />
          <FeatureBar
            title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
            hide={acceptedCookies}
            action={
              <Button className="mx-5" onClick={() => onAcceptCookies()}>
                Accept cookies
              </Button>
            }
          />
        </div>
      </div>
    </CommerceProvider>
  )
}

export default Layout
