import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { path } from 'src/constants/path'
import RatingStart from '../RatingStart/RatingStart'
import * as sly from './Fillter.styled'
import qs from 'query-string'
import PropTypes from 'prop-types'
import useQuerry from 'src/hook/useQuerry'
import { Controller, useForm } from 'react-hook-form'
export default function FilterPanel({ Categories, fillter }) {
  const history = useHistory()
  const query = useQuerry()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
    clearErrors
  } = useForm({
    defaultValues: {
      minPrice: fillter.minPrice || '',
      maxPrice: fillter.maxPrice || ''
    },
    reValidateMode: 'onSubmit'
  })

  useEffect(() => {
    setValue('minPrice', fillter.minPrice || '')
    setValue('maxPrice', fillter.maxPrice || '')
  }, [setValue, fillter])

  const searchPrice = data => {
    const { minPrice, maxPrice } = data
    if (minPrice !== '' || maxPrice !== '') {
      let _filters = fillter
      if (minPrice !== '') {
        _filters = { ..._filters, minPrice }
      } else {
        delete _filters.minPrice
      }
      if (maxPrice !== '') {
        _filters = { ..._filters, maxPrice }
      } else {
        delete _filters.maxPrice
      }
      history.push(path.home + `?${qs.stringify(_filters)}`)
    }
  }
  const clearAllFilters = () => {
    reset()
    history.push({
      pathname: path.home
    })
  }
  const ValidPrice = () => {
    const minPrice = getValues('minPrice')
    const maxPrice = getValues('maxPrice')
    const message = 'Vui lòng điền giá phù hợp'
    if ((minPrice !== '') & (maxPrice !== '')) {
      return Number(maxPrice) >= Number(minPrice) || message
    }
    return minPrice !== '' || maxPrice !== '' || message
  }

  return (
    <div>
      <sly.CategoryTitleLink to={path.home}>
        <svg enablebackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0} className="shopee-svg-icon ">
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokelinecap="round"
              strokeLinejoin="round"
              strokemiterlimit={10}
            />
          </g>
        </svg>
        Tất cả danh mục
      </sly.CategoryTitleLink>
      <sly.CategoryList>
        {Categories.map(category => (
          <sly.CategoryItems key={category._id}>
            <NavLink
              isActive={(match, location) => {
                if (!match) {
                  return false
                }
                const query = qs.parse(location.search)
                return query.category === category._id
              }}
              to={path.home + `?category=${category._id}`}
            >
              {' '}
              {category.name}{' '}
            </NavLink>
          </sly.CategoryItems>
        ))}
      </sly.CategoryList>
      <sly.CategoryTitle>
        <svg enablebackground="new 0 0 15 15" viewBox="0 0 15 15" x={0} y={0} className="shopee-svg-icon ">
          <g>
            <polyline
              fill="none"
              points="5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
            />
          </g>
        </svg>{' '}
        Bộ lọc tìm kiếm
      </sly.CategoryTitle>
      <sly.FillterGroup>
        <sly.FillterPriceHeader>Khoảng giá</sly.FillterPriceHeader>
        <sly.PriceRange>
          <sly.PriceRangeGroup>
            <Controller
              name="minPrice"
              control={control}
              rules={{
                validate: {
                  ValidPrice
                }
              }}
              render={({ field }) => (
                <sly.PriceRangeInPut
                  placeholder="Từ"
                  onChange={value => {
                    clearErrors()
                    field.onChange(value)
                  }}
                  value={getValues('minPrice')}
                />
              )}
            ></Controller>

            <sly.PriceRangeLine />
            <Controller
              name="maxPrice"
              control={control}
              rules={{
                validate: {
                  ValidPrice
                }
              }}
              render={({ field }) => (
                <sly.PriceRangeInPut
                  placeholder="Đến"
                  onChange={value => {
                    clearErrors()
                    field.onChange(value)
                  }}
                  value={getValues('maxPrice')}
                />
              )}
            ></Controller>
          </sly.PriceRangeGroup>
          {Object.values(errors).length !== 0 && <sly.PriceErr>Vui lòng điền giá phù hợp</sly.PriceErr>}

          <sly.PriceButton onClick={handleSubmit(searchPrice)}>Áp dụng</sly.PriceButton>
        </sly.PriceRange>
      </sly.FillterGroup>
      <sly.FillterGroup>
        <sly.FillterPriceHeader>Đánh giá</sly.FillterPriceHeader>
        <RatingStart fillter={fillter}></RatingStart>
      </sly.FillterGroup>
      <sly.RemoveFillterBtn onClick={clearAllFilters}>Xóa tất cả </sly.RemoveFillterBtn>
    </div>
  )
}
FilterPanel.propTypes = {
  Categories: PropTypes.array.isRequired,
  fillter: PropTypes.object.isRequired
}
