import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from '../ProductRating/ProductRating'
import * as sly from './ProductItem.styled'
import PropTypes from 'prop-types'
import { path } from 'src/constants/path'
import { generaNameId } from 'src/utils/helper'
import { formatMoney } from 'src/utils/helper'
import { formatK } from 'src/utils/helper'

export default function ProductItems({ product }) {
  return (
    <sly.Product>
      <Link to={path.product + `/${generaNameId(product)}`}>
        <sly.productItems>
          <sly.productItemsImg>
            <img src={product.image} alt={product.name} />
          </sly.productItemsImg>
          <sly.productItemsInfo>
            <sly.productItemsTitle>{product.name}</sly.productItemsTitle>
            <sly.productItemsPrice>
              <sly.productItemsPriceOriginal>
                đ{formatMoney(product.price_before_discount)}
              </sly.productItemsPriceOriginal>
              <sly.productItemsPriceSales>đ{formatMoney(product.price)}</sly.productItemsPriceSales>
            </sly.productItemsPrice>
            <sly.productItemsMeta>
              <ProductRating rating={product.rating} />
              <sly.productItemsSold>
                <span>{formatK(product.sold)}</span>
                <span>Đã bán</span>
              </sly.productItemsSold>
            </sly.productItemsMeta>
          </sly.productItemsInfo>
        </sly.productItems>
      </Link>
    </sly.Product>
  )
}
ProductItems.propTypes = {
  product: PropTypes.object.isRequired
}
