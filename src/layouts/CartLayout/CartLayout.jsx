import React from 'react'
import Foodter from 'src/components/Foodter/Foodter'
import PropTypes from 'prop-types'
import HeaderCart from 'src/components/HeaderCart/HeaderCart'

export default function CartLayout({ children }) {
  return (
    <div>
      <HeaderCart />
      {children}
      <Foodter />
    </div>
  )
}

CartLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
