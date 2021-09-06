import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from 'src/api/auth.api'
import userApi from 'src/api/user.api'
import LocalStorage from 'src/constants/localStorage'
import { payloadCreator } from 'src/utils/helper'

// export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
//   try {
//     const res = await authApi.register(data)
//     return res
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error)
//   }
// })
/// Sử dụng lại hàm đã custom
export const register = createAsyncThunk('auth/register', payloadCreator(authApi.register))
export const login = createAsyncThunk('auth/login', payloadCreator(authApi.login))
export const logout = createAsyncThunk('auth/logout', payloadCreator(authApi.logout))
export const updateMe = createAsyncThunk('auth/updateMe', payloadCreator(userApi.updateMe))

const handleAuthFuilled = (state, action) => {
  const { user, access_token } = action.payload.data
  state.profile = user
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
  localStorage.setItem(LocalStorage.accessToken, access_token)
}

const handleUnAuth = state => {
  state.profile = {}
  localStorage.removeItem(LocalStorage.user)
  localStorage.removeItem(LocalStorage.accessToken)
}

const auth = createSlice({
  name: 'auth',
  reducers: {
    unauth: handleUnAuth
  },
  initialState: { profile: JSON.parse(localStorage.getItem(LocalStorage.user)) || {} },
  extraReducers: {
    [register.fulfilled]: handleAuthFuilled,
    [login.fulfilled]: handleAuthFuilled,
    [logout.fulfilled]: handleUnAuth,
    [updateMe.fulfilled]: (state, action) => {
      state.profile = action.payload.data
      localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
    }
  }
})
const autReducer = auth.reducer
export default autReducer
export const unauth = auth.actions.unauth
