import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductQuantity from 'src/components/ProductQuantity/ProductQuantity'
import ProductRating from 'src/components/ProductRating/ProductRating'
import { formatK, formatMoney, getIdToNameId, rateSales } from 'src/utils/helper'
import { addToCart, getProductDetail } from './ProductDetail.slice'
import * as sly from './ProductDetial.styled'
import DOMPurify from 'dompurify'
import { toast } from 'react-toastify'
import { getCartPurchase } from '../Cart/Cart.slice'
export default function ProductDetail() {
  const [products, setProducts] = useState()
  const [currentImage, setCurentImage] = useState({})
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [quantity, setQuantity] = useState(1)

  const currentImages = useMemo(() => {
    if (products) {
      return products.images.slice(...currentIndexImage)
    }
    return []
  }, [products, currentIndexImage])

  const dispatch = useDispatch()
  const { idProduct } = useParams()

  useEffect(() => {
    const realId = getIdToNameId(idProduct)
    dispatch(getProductDetail(realId))
    axios.get(`https://api-ecom.duthanhduoc.com/products/${realId}`).then(res => {
      res.data.data.images = res.data.data.images.map((image, index) => {
        return {
          url: image,
          id: index
        }
      })
      setCurentImage(res.data.data.images[0])
      setProducts(res.data.data)
    })
  }, [idProduct, dispatch])
  const chooseCurrent = image => setCurentImage(image)
  const choosePrev = () => {
    console.log('sada')
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage(currentIndexImage => [currentIndexImage[0] - 1, currentIndexImage[1] - 1])
    }
  }
  const chooseNext = () => {
    if (currentIndexImage[1] < products.images.length) {
      setCurrentIndexImage(currentIndexImage => [currentIndexImage[0] + 1, currentIndexImage[1] + 1])
    }
  }
  const handleChangeQuantity = value => {
    setQuantity(value)
  }
  const handleAddToCart = async () => {
    const body = {
      product_id: products._id,
      buy_count: quantity
    }
    const res = await dispatch(addToCart(body)).then(unwrapResult)
    await dispatch(getCartPurchase()).then(unwrapResult)
    toast.success(res.message, {
      position: 'top-right'
    })

    dispatch(getCartPurchase())
  }
  // console.log(realId, 'realID');

  // .then(unwrapResult => {
  //   console.log(unwrapResult, 'unwrapResult');
  // })
  // .then(res => {
  //   console.log(res, 'ress');
  //   setProducts(res)
  // })

  return (
    <div>
      {products && (
        <div className="container">
          <sly.ProductBried>
            <sly.ProductImg>
              <sly.ProductImgActive>
                <img src={currentImage.url} alt="" />
              </sly.ProductImgActive>
              <sly.ProductImgSlider>
                <sly.ProductIconButtonPrev onClick={choosePrev}>
                  <svg
                    enableBackground="new 0 0 11 11"
                    viewBox="0 0 11 11"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-left"
                  >
                    <g>
                      <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z" />
                    </g>
                  </svg>
                </sly.ProductIconButtonPrev>
                {currentImages.map(imgs => (
                  <sly.ProductImgs
                    key={imgs.id}
                    onMouseEnter={() => chooseCurrent(imgs)}
                    active={currentImage.id === imgs.id}
                  >
                    <img src={imgs.url} alt="" />
                  </sly.ProductImgs>
                ))}
                <sly.ProductIconButtonNext onClick={chooseNext}>
                  <svg
                    enableBackground="new 0 0 11 11"
                    viewBox="0 0 11 11"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-right"
                  >
                    <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z" />
                  </svg>
                </sly.ProductIconButtonNext>
              </sly.ProductImgSlider>
            </sly.ProductImg>
            <sly.ProductMeta>
              <sly.ProductTitle>{products.name}</sly.ProductTitle>
              <sly.ProductMeta1>
                <sly.ProductRating>
                  <span>{products.rating}</span>
                  <ProductRating rating={products.rating}></ProductRating>
                </sly.ProductRating>
                <sly.ProductSold>
                  <span>{formatK(products.sold)}</span>
                  <span>Đã bán</span>
                </sly.ProductSold>
              </sly.ProductMeta1>
              <sly.ProductPrice>
                <sly.ProductPriceOrginal>đ{formatMoney(products.price_before_discount)}</sly.ProductPriceOrginal>
                <sly.ProducePriceSales>đ{formatMoney(products.price)}</sly.ProducePriceSales>
                <sly.ProductPriceSalesPercent>
                  {rateSales(products.price_before_discount, products.price)} Giảm giá
                </sly.ProductPriceSalesPercent>
              </sly.ProductPrice>
              <sly.ProductByQuantity>
                <sly.ProductByQuantityTitle>Số lượng</sly.ProductByQuantityTitle>
                <sly.ProductByQuantityControler>
                  <ProductQuantity
                    value={quantity}
                    max={products.quantity}
                    onChange={handleChangeQuantity}
                  ></ProductQuantity>
                </sly.ProductByQuantityControler>
                <sly.ProductQuantityCount>{products.quantity} Sản phẩm có sẵn</sly.ProductQuantityCount>
              </sly.ProductByQuantity>
              <sly.ProductButton onClick={handleAddToCart}>
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="shopee-svg-icon _2FCuXA icon-add-to-cart"
                >
                  <g>
                    <g>
                      <polyline
                        fill="none"
                        points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                      />
                      <circle cx={6} cy="13.5" r={1} stroke="none" />
                      <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                    </g>
                    <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1="7.5" x2="10.5" y1={7} y2={7} />
                    <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1={9} x2={9} y1="8.5" y2="5.5" />
                  </g>
                </svg>
                Thêm vào giỏ hàng
              </sly.ProductButton>
            </sly.ProductMeta>
          </sly.ProductBried>
          <sly.ProductContent>
            <sly.ProductContentHeading>Mô tả sản phẩm</sly.ProductContentHeading>
            <sly.ProductContentDetail
              dangerouslySetInnerHTML={
                // Sử dụng DOMPurify.sanitize( dirty ); để render ra html tránh các đoạn mã script
                { __html: DOMPurify.sanitize(products.description) }
              }
            ></sly.ProductContentDetail>
          </sly.ProductContent>
        </div>
      )}
    </div>
  )
}
