import { createNextState, unwrapResult } from '@reduxjs/toolkit'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckBox from 'src/components/BaseCheckBox/CheckBox'
import ProductQuantity from 'src/components/ProductQuantity/ProductQuantity'
import { formatMoney } from 'src/utils/helper'
import { BuyPurchare, DeletePurchare, getCartPurchase, UpdatePurchare } from './Cart.slice'
import * as sly from './Cart.styled'

import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import axios from 'axios'
// thư viện keyby giúp conver từ một cái arr thành obj dựa vào theo key đã cung cấp
export default function Cart() {
  const dispatch = useDispatch()
  const purcharse = useSelector(state => state.cart.purcharse)
  // createNextState dùng để tránh mutate state của purcharse
  const [LocalPurchase, setLocalPurchase] = useState(() =>
    createNextState(purcharse, draft => {
      draft.forEach(purchase => {
        purchase.disabled = false
        purchase.checked = false
      })
    })
  )
  const isCheckedAll = LocalPurchase.every(purcharse => purcharse.checked)
  const checkedPurcharse = LocalPurchase.filter(purcharse => purcharse.checked)
  const totalCheckedPurchare = checkedPurcharse.length
  const totalCheckedPurcharePrice = checkedPurcharse.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const totalCheckedPurchareSavingPrice = checkedPurcharse.reduce((result, current) => {
    return result + (current.product.price_before_discount - current.product.price) * current.buy_count
  }, 0)
  useEffect(() => {
    setLocalPurchase(LocalPurchase => {
      const localPurcharseObj = keyBy(LocalPurchase, '_id')
      return createNextState(purcharse, draft => {
        draft.forEach(purchase => {
          purchase.disabled = false
          purchase.checked = Boolean(localPurcharseObj[purchase._id]?.checked)
        })
      })
    })
  }, [purcharse])

  const handleInputQuantity = indexPurchare => value => {
    const newLocalPurchase = createNextState(LocalPurchase, draft => {
      draft[indexPurchare].buy_count = value
    })
    setLocalPurchase(newLocalPurchase)
  }
  const handleBlurQuantity = indexPurchare => async value => {
    const purchase = LocalPurchase[indexPurchare]
    setLocalPurchase(LocalPurchase =>
      createNextState(LocalPurchase, draft => {
        draft[indexPurchare].disabled = true
      })
    )
    await dispatch(
      UpdatePurchare({
        product_id: purchase.product._id,
        buy_count: value
      })
    ).then(unwrapResult)

    await dispatch(getCartPurchase()).then(unwrapResult)
    setLocalPurchase(LocalPurchase =>
      createNextState(LocalPurchase, draft => {
        draft[indexPurchare].disabled = false
      })
    )
  }
  const handleIncreseAndDecrese = indexPurchare => async value => {
    const purchase = LocalPurchase[indexPurchare]
    setLocalPurchase(LocalPurchase =>
      createNextState(LocalPurchase, draft => {
        draft[indexPurchare].disabled = true
        draft[indexPurchare].buy_count = value
      })
    )
    await dispatch(
      UpdatePurchare({
        product_id: purchase.product._id,
        buy_count: value
      })
    ).then(unwrapResult)

    await dispatch(getCartPurchase()).then(unwrapResult)
    setLocalPurchase(LocalPurchase =>
      createNextState(LocalPurchase, draft => {
        draft[indexPurchare].disabled = false
      })
    )
  }

  const handleCheck = indexPurchare => value => {
    setLocalPurchase(LocalPurchase =>
      createNextState(LocalPurchase, draft => {
        draft[indexPurchare].checked = value
      })
    )
  }
  const handleCheckAll = () => {
    setLocalPurchase(LocalPurchase =>
      createNextState(LocalPurchase, draft => {
        draft.forEach(purchase => {
          purchase.checked = !isCheckedAll
        })
      })
    )
  }
  const handleRemovePurcharse = indexPurchare => async () => {
    const purcharseId = LocalPurchase[indexPurchare]._id
    await dispatch(DeletePurchare([purcharseId])).then(unwrapResult)
    await dispatch(getCartPurchase()).then(unwrapResult)
    toast.success('Xóa đơn hàng thành công ', {
      position: 'top-right'
    })
  }
  const handleRemoveAllPurchare = async () => {
    const purchareIds = checkedPurcharse.map(purchase => purchase._id)
    await dispatch(DeletePurchare(purchareIds)).then(unwrapResult)
    await dispatch(getCartPurchase()).then(unwrapResult)
    toast.success('Xóa đơn hàng thành công ', {
      position: 'top-right'
    })
  }
  const handleBuyPurchase = async () => {
    if (checkedPurcharse.length > 0) {
      const body = checkedPurcharse.map(purchare => ({
        product_id: purchare.product._id,
        buy_count: purchare.buy_count
      }))
      const path = 'https://api-ecom.duthanhduoc.com/buy-products/'
      await axios.post(path, body).then(res => {
        console.log(res)
      })

      // await dispatch(BuyPurchare(body)).then(console.log(body))
      //   console.log(e);
      // })

      await dispatch(getCartPurchase()).then(unwrapResult)
      toast.success('Đơn hàng đã đặt thành công ', {
        position: 'top-right'
      })
    }
  }
  const handleBuyBuy = payload => {
    const path = 'https://api-ecom.duthanhduoc.com/buy-products/'
    axios.post(path, payload).then(res => {
      console.log(res)
    })
  }
  return (
    <div className="container">
      <div>
        <sly.ProductHeader>
          <sly.ProductHeaderCheckbox>
            <CheckBox onChange={handleCheckAll} checked={isCheckedAll} />
          </sly.ProductHeaderCheckbox>
          <sly.ProductHeaderTitle>Sản phẩm</sly.ProductHeaderTitle>
          <sly.ProductHeaderUntitPrice>Đơn giá</sly.ProductHeaderUntitPrice>
          <sly.ProductHeaderQuantity>Số lượng</sly.ProductHeaderQuantity>
          <sly.ProductHeaderTotalPrice>Số tièn</sly.ProductHeaderTotalPrice>
          <sly.ProductHeaderAction>Thao tác</sly.ProductHeaderAction>
        </sly.ProductHeader>
        <sly.ProductSection>
          {LocalPurchase.map((purchase, index) => (
            <sly.CartItem key={purchase._id}>
              <sly.CartItemCheckbox>
                <CheckBox checked={purchase.checked} onChange={handleCheck(index)} />
              </sly.CartItemCheckbox>
              <sly.CartItemOverview>
                <sly.CartItemOverviewImage to="">
                  <img src={purchase.product.image} alt="" />
                </sly.CartItemOverviewImage>
                <sly.CartItemOverviewNameWraper>
                  <sly.CartItemOverviewName>{purchase.product.name}</sly.CartItemOverviewName>
                </sly.CartItemOverviewNameWraper>
              </sly.CartItemOverview>
              <sly.CartItemUnitPrice>
                <span>đ{formatMoney(purchase.product.price_before_discount)}</span>
                <span>đ{formatMoney(purchase.product.price)}</span>
              </sly.CartItemUnitPrice>
              <sly.CartitemQuantity>
                <ProductQuantity
                  max={purchase.product.quantity}
                  value={purchase.buy_count}
                  disabled={purchase.disabled}
                  onInput={handleInputQuantity(index)}
                  onBlur={handleBlurQuantity(index)}
                  onIncrease={handleIncreseAndDecrese(index)}
                  onDecrease={handleIncreseAndDecrese(index)}
                />
              </sly.CartitemQuantity>
              <sly.CartitemTotalPrice>
                <span>₫{formatMoney(purchase.product.price * purchase.buy_count)}</span>
              </sly.CartitemTotalPrice>
              <sly.CartitemAction>
                <sly.CartitemActionButton onClick={handleRemovePurcharse(index)}>Xóa</sly.CartitemActionButton>
              </sly.CartitemAction>
            </sly.CartItem>
          ))}
        </sly.ProductSection>
      </div>
      <sly.CartFooter>
        <sly.CartFooterCheckbox>
          <CheckBox onChange={handleCheckAll} checked={isCheckedAll} />
        </sly.CartFooterCheckbox>
        <sly.CartFooterButton onClick={handleCheckAll}>Chọn tất cả ({purcharse.length})</sly.CartFooterButton>
        <sly.CartFooterButton onClick={handleRemoveAllPurchare}>Xóa</sly.CartFooterButton>
        <sly.CartFooterSpaceBetween />
        <sly.CartFooterPrice>
          <sly.CartFooterPriceTop>
            <div>Tổng thanh toán ({totalCheckedPurchare} sản phẩm)</div>
            <div>₫{formatMoney(totalCheckedPurcharePrice)}</div>
          </sly.CartFooterPriceTop>
          <sly.CartFooterPriceBot>
            <div>Tiết kiệm</div>
            <div>₫{formatMoney(totalCheckedPurchareSavingPrice)}</div>
          </sly.CartFooterPriceBot>
        </sly.CartFooterPrice>
        <sly.CartFooterCheckout onClick={handleBuyPurchase}>Mua hàng</sly.CartFooterCheckout>
      </sly.CartFooter>
    </div>
  )
}
