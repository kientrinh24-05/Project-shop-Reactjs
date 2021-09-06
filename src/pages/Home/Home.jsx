import { unwrapResult } from '@reduxjs/toolkit'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FilterPanel from 'src/components/FilterBaner/FilterPanel'
import SearchItemResult from 'src/components/SearchItemsResult/SearchItemResult'
import useQuerry from 'src/hook/useQuerry'
import { getCategories, getProducts } from './Home.slice'
import * as sly from './Home.styled'
export default function Home() {
  const [Categories, setCategories] = useState([])
  const [products, setProducts] = useState({
    products: [],
    pagination: {}
  })
  const [fillter, setFillter] = useState({})
  const dispatch = useDispatch()
  const query = useQuerry()
  useEffect(() => {
    dispatch(getCategories())
      .then(unwrapResult)
      .then(res => {
        console.log(res, 'res data')
        setCategories(res.data)
      })
  }, [dispatch])
  useEffect(() => {
    const _filters = {
      ...query,
      page: query.page || 1,
      limit: query.limit || 30,
      sortBy: query.sortBy || 'view'
    }
    setFillter(_filters)
    const params = {
      page: _filters.page,
      limit: _filters.limit,
      category: _filters.category,
      exclude: _filters.exclude,
      rating_filter: _filters.rating,
      price_max: _filters.maxPrice,
      price_min: _filters.minPrice,
      sort_by: _filters.sortBy,
      order: _filters.order,
      name: _filters.name
    }

    const _getProducts = async () => {
      const data = await dispatch(getProducts({ params }))
      const res = unwrapResult(data)
      setProducts(res.data)
    }
    _getProducts()
  }, [query, dispatch])

  return (
    <div>
      <sly.Container className="container">
        <sly.Side>
          <FilterPanel Categories={Categories} fillter={fillter}></FilterPanel>
        </sly.Side>
        <sly.Main>
          <SearchItemResult fillter={fillter} products={products}></SearchItemResult>
        </sly.Main>
      </sly.Container>
    </div>
  )
}
