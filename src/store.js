import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './app.slice'
import autReducer from './pages/Authention/authention.slice'
import cartReducer from './pages/Cart/Cart.slice'

const rootReducer = {
  auth: autReducer,
  app: appReducer,
  cart: cartReducer
}
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: [...getDefaultMiddleware({ serializableCheck: false })]
})
export default store
