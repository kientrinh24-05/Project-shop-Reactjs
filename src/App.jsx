import React, { useEffect } from 'react'
import 'normalize.css'
import 'src/assets/styles/global.scss'
import Routesx from 'src/Routes/Routesx.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Zoom } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { unauth } from './pages/Authention/authention.slice'
import { path } from './constants/path'
import { useAuth } from './hook/useAuth'
import { getCartPurchase } from './pages/Cart/Cart.slice'
function App() {
  const status = useSelector(state => state.app.message)
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useAuth()
  useEffect(() => {
    if (status === 'Token không được gửi') {
      dispatch(unauth())
      history.push(path.login)
    }
  }, [dispatch, status, history])
  useEffect(() => {
    if (auth) {
      dispatch(getCartPurchase())
      console.log('đã get')
    }
  }, [auth, dispatch])
  return (
    <div className="App">
      <Routesx />
      <ToastContainer draggable={false} transition={Zoom} autoClose={1000} />
    </div>
  )
}

export default App
