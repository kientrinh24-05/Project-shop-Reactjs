import React from 'react'
import Foodter from 'src/components/Foodter/Foodter'
import Header from 'src/components/Header/Header'

export default function RegisterLayout({ children, title }) {
  return (
    <div>
      <Header title={title}></Header>
      {children}
      <Foodter />
    </div>
  )
}
