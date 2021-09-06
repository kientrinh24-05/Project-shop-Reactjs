import { createSlice } from '@reduxjs/toolkit'

const app = createSlice({
  name: 'app',
  initialState: {
    status: 200
  },

  extraReducers: builder => {
    builder.addMatcher(
      action => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      // this.reducers.getState(this.state, this.action)
      (state, action) => {
        state.status = action.payload
      }
    )
  }
})
const appReducer = app.reducer
export default appReducer
