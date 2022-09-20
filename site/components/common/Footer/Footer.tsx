import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  return (
    <div className="home-footer">
      <div className="home-content">
        <div className="home-links">
          <div className="home-logo1">
            <img
              src="/assets/iconsi628-p03u.svg"
              alt="iconsI628"
              className="home-icons5"
            />
            <span className="home-text65">
                <span>ARBRE</span>
              </span>
          </div>
          <div className="home-menu1">
            <div className="home-itemlink2">
                <span className="home-text67">
                  <span>Home</span>
                </span>
            </div>
            <div className="home-itemlink3">
                <span className="home-text69">
                  <span>Marketplace</span>
                </span>
            </div>
            <div className="home-itemlink4">
                <span className="home-text71">
                  <span>About Us</span>
                </span>
            </div>
            <div className="home-itemlink5">
                <span className="home-text73">
                  <span>Contact</span>
                </span>
            </div>
            <div className="home-itemlink6">
                <span className="home-text75">
                  <span>Terms</span>
                </span>
            </div>
            <div className="home-itemlink7">
                <span className="home-text77">
                  <span>Privacy</span>
                </span>
            </div>
          </div>
          <div className="home-icons6">
            <div className="home-icons-dribbble">
              <img
                src="/assets/iconsdribbblei628-hmak.svg"
                alt="iconsDribbbleI628"
                className="home-icons-dribbble1"
              />
            </div>
            <div className="home-icons-instagram">
              <img
                src="/assets/iconsinstagrami628-3djt.svg"
                alt="iconsInstagramI628"
                className="home-icons-instagram1"
              />
            </div>
            <div className="home-icons-linkedin">
              <div className="home-icons-linkedin1">
                <div className="home-linkedinicon">
                  <div className="home-group">
                    <img
                      src="/assets/vectori628-cmm.svg"
                      alt="VectorI628"
                      className="home-vector"
                    />
                  </div>
                  <div className="home-group1">
                    <img
                      src="/assets/vectori628-up1s.svg"
                      alt="VectorI628"
                      className="home-vector1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span className="home-text79 font12Regular">
            <span>© 2022 Arbre. All Rights Reserved.</span>
          </span>
      </div>
    </div>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
