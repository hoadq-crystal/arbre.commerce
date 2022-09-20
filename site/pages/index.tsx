import commerce from '@lib/api/commerce'
import {Layout} from '@components/common'
import {Container} from '@components/ui'
import type {GetStaticPropsContext, InferGetStaticPropsType} from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  console.log('products ===>>>: ' + JSON.stringify(products))
  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="home-fold1">
        <img
          src="/assets/image16283-gxb-500h.png"
          alt="image16283"
          className="home-image1"
        />
        <div className="home-text10">
              <span className="home-text11">
                <span className="home-text12">
                  <span>
                    Discover and buy
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <br></br>
                  <span></span>
                </span>
                <span className="home-text13">Petrochemical products globally</span>
              </span>
          <div className="home-search">
            <button className="home-button2">
                  <span className="home-text17">
                    <span>BROWSE ALL PRODUCTS</span>
                  </span>
            </button>
          </div>
          <div className="home-popular">
                <span className="home-text19 font16SemiBold">
                  <span>Popular:</span>
                </span>
            <div className="home-keyword">
              <button className="home-button3">
                    <span className="home-text21">
                      <span>Hydrogen Chloride</span>
                    </span>
              </button>
              <button className="home-button4">
                    <span className="home-text23">
                      <span>Methanol</span>
                    </span>
              </button>
              <button className="home-button5">
                    <span className="home-text25">
                      <span>Sodium Bicarbonate</span>
                    </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-fold2">
        <div className="home-number">
          <div className="home-stockists">
            <img
              src="/assets/icons6284-s35d.svg"
              alt="icons6284"
              className="home-icons1"
            />
            <span className="home-text27">
                  <span>500+</span>
                </span>
            <span className="home-text29 font16SemiBold">
                  <span>Stockists</span>
                </span>
          </div>
          <div className="home-grade">
            <img
              src="/assets/icons6285-ezd5.svg"
              alt="icons6285"
              className="home-icons2"
            />
            <span className="home-text31">
                  <span>1,00+</span>
                </span>
            <span className="home-text33 font16SemiBold">
                  <span>Grade Prices</span>
                </span>
          </div>
          <div className="home-companies">
            <img
              src="/assets/icons6285-7835.svg"
              alt="icons6285"
              className="home-icons3"
            />
            <span className="home-text35">
                  <span>50+</span>
                </span>
            <span className="home-text37 font16SemiBold">
                  <span>Polymer Companies</span>
                </span>
          </div>
          <div className="home-supply">
            <img
              src="/assets/icons6286-qfom.svg"
              alt="icons6286"
              className="home-icons4"
            />
            <span className="home-text39">
                  <span>120+</span>
                </span>
            <span className="home-text41 font16SemiBold">
                  <span>Supply Locations</span>
                </span>
          </div>
        </div>
      </div>
      <div className="home-group9">
            <span className="home-text43 font32SemiBold">
              <span className="home-text44">
                <span>Buying petrochemicals,</span>
                <br></br>
                <span></span>
              </span>
              <span>
                <span>is easier than online</span>
                <br></br>
                <span>shopping. Really!</span>
              </span>
            </span>
        <span className="home-text52 font32SemiBold">
              <span className="home-text53">
                <span>Selling petrochemicals,</span>
                <br></br>
                <span></span>
              </span>
              <span>
                <span>easier than posting your</span>
                <br></br>
                <span>picture online!</span>
              </span>
            </span>
        <span className="home-text61 font16Regular">
              <span>FOR BUYER</span>
            </span>
        <span className="home-text63 font16Regular">
              <span>FOR SELLER</span>
            </span>
      </div>
    </>
  )
}
Home.Layout = Layout
