import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { path } from 'src/constants/path'
import Authguards from 'src/guards/Authguards'
import UnAuthGuards from 'src/guards/UnAuthGuards'
import CartLayout from 'src/layouts/CartLayout/CartLayout'
import MainLayout from 'src/layouts/MainLayout/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout/RegisterLayout'
import Login from 'src/pages/Authention/Login/Login'
import Register from 'src/pages/Authention/Register/Register'
import Cart from 'src/pages/Cart/Cart'
import Home from 'src/pages/Home/Home'
import NotFound from 'src/pages/NotFound/NotFound'
import ProductDetail from 'src/pages/ProductDetail/ProductDetail'
import User from 'src/pages/User/User'

function Routesx() {
  return (
    <Switch>
      <Route path={path.home} exact>
        <MainLayout>
          <Home></Home>
        </MainLayout>
      </Route>
      <Route path={path.productdetail}>
        <MainLayout>
          <ProductDetail></ProductDetail>
        </MainLayout>
      </Route>
      <Route path={path.login}>
        <UnAuthGuards>
          <RegisterLayout title="Đăng Nhập">
            <Login></Login>
          </RegisterLayout>
        </UnAuthGuards>
      </Route>
      <Route path={path.register}>
        <UnAuthGuards>
          <RegisterLayout title="Đăng Ký">
            <Register></Register>
          </RegisterLayout>
        </UnAuthGuards>
      </Route>
      <Route path={path.user}>
        <Authguards>
          <MainLayout>
            <User />
          </MainLayout>
        </Authguards>
      </Route>
      <Route path={path.cart}>
        <Authguards>
          <CartLayout>
            <Cart />
          </CartLayout>
        </Authguards>
      </Route>
      <Route path={path.notfound}>
        <NotFound></NotFound>
      </Route>
    </Switch>
  )
}
export default Routesx
