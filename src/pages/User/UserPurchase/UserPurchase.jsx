import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { statusCart } from 'src/constants/status'
import useQuerry from 'src/hook/useQuerry'
import { getPurchare } from '../User.slice'
import { path } from 'src/constants/path'
import { generaNameId } from 'src/utils/helper'
import * as sly from './Purchare.styled'
import { formatMoney } from 'src/utils/helper'
import qr from 'query-string'
export default function UserPurchase() {
  const [purchases, setPurchases] = useState([])
  const dispatch = useDispatch()
  const querry = useQuerry()
  const status = useMemo(() => querry.status || statusCart.all, [querry])
  useEffect(() => {
    dispatch(getPurchare(status))
      .then(unwrapResult)
      .then(res => {
        setPurchases(res.data)
      })
  }, [status, dispatch])

  const handleActive = value => () => Number(value) === Number(status)
  return (
    <div>
      <sly.PurcharseTabs>
        <sly.PurcharseTabsItems to={path.purchases} isActive={handleActive(statusCart.all)}>
          Tất cả
        </sly.PurcharseTabsItems>
        <sly.PurcharseTabsItems
          to={{
            pathname: path.purchares,
            search: `?${qr.stringify({
              status: statusCart.waitForConfirmation
            })}`
          }}
          isActive={handleActive(statusCart.waitForConfirmation)}
        >
          Chờ xác nhận
        </sly.PurcharseTabsItems>
        <sly.PurcharseTabsItems
          to={{
            pathname: path.purchares,
            search: `?${qr.stringify({
              status: statusCart.waitForGetting
            })}`
          }}
          isActive={handleActive(statusCart.waitForGetting)}
        >
          Chờ lấy hàng
        </sly.PurcharseTabsItems>
        <sly.PurcharseTabsItems
          to={{
            pathname: path.purchares,
            search: `?${qr.stringify({ status: statusCart.inProgress })}`
          }}
          isActive={handleActive(statusCart.inProgress)}
        >
          Đang giao
        </sly.PurcharseTabsItems>
        <sly.PurcharseTabsItems
          to={{
            pathname: path.purchares,
            search: `?${qr.stringify({ status: statusCart.delivered })}`
          }}
          isActive={handleActive(statusCart.delivered)}
        >
          Đã giao
        </sly.PurcharseTabsItems>
        <sly.PurcharseTabsItems
          to={{
            pathname: path.purchares,
            search: `?${qr.stringify({
              status: statusCart.cancelled
            })}`
          }}
          isActive={handleActive(statusCart.cancelled)}
        >
          Đã hủy
        </sly.PurcharseTabsItems>
      </sly.PurcharseTabs>
      <sly.PurcharsList>
        {purchases.map(purchasess => (
          <sly.OrderCard key={purchasess._id}>
            <sly.OrderCardContent>
              <sly.OrderCardDetail>
                <img src={purchasess.product.image} alt="" />
                <sly.OrderContent>
                  <sly.OrderName>{purchasess.product.name}</sly.OrderName>
                  <sly.OrderQuantity>x{purchasess.product.buy_count} </sly.OrderQuantity>
                </sly.OrderContent>
              </sly.OrderCardDetail>
              <sly.OrderCardPrice>đ{formatMoney(purchasess.product.price)}</sly.OrderCardPrice>
            </sly.OrderCardContent>
            <sly.OrderCartButton>
              <sly.PurchareButton to={path.product + `/${generaNameId(purchasess.product)}`}>
                Xem sản phẩm
              </sly.PurchareButton>
              <sly.TotalPrice>
                <sly.TotalPriceLabel>Tổng giá tiền</sly.TotalPriceLabel>
                <sly.TotalPriceCoutn>
                  đ{formatMoney(purchasess.product.price * purchasess.product.buy_count)}
                </sly.TotalPriceCoutn>
              </sly.TotalPrice>
            </sly.OrderCartButton>
          </sly.OrderCard>
        ))}
      </sly.PurcharsList>
    </div>
  )
}
