import React from 'react'
import Foodter from 'src/components/Foodter/Foodter'
import HeaderMain from 'src/components/HeaderMain/HeaderMain'
export default function MainLayout({ children }) {
  return (
    <div>
      <HeaderMain />
      {children}
      <Foodter />
    </div>
  )
}
