import { getSearchStaticProps } from '@lib/search-props'
import type { GetStaticPropsContext } from 'next'
import Search from '@components/search'
import {useCustomer} from "@framework/customer";
import useWishlist from "@framework/wishlist/use-wishlist";
import {Container, Skeleton, Text} from "@components/ui";
import rangeMap from "@lib/range-map";
import {Heart} from "@components/icons";
import {WishlistCard} from "@components/wishlist";
import {Layout} from "@components/common";

export async function getStaticProps(context: GetStaticPropsContext) {
  return getSearchStaticProps(context)
}


export default function Register() {
  const { data: customer } = useCustomer()
  // @ts-ignore Shopify - Fix this types
  const { data, isLoading, isEmpty } = useWishlist({ includeProducts: true })

  return (
    <Container className="pt-4">
      <div className="mb-20">
        <Text variant="pageHeading">Register page</Text>

      </div>
    </Container>
  )
}

Register.Layout = Layout

