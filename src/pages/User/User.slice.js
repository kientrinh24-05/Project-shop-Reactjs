import { createAsyncThunk } from '@reduxjs/toolkit'
import userApi from 'src/api/user.api'
import { payloadCreator } from 'src/utils/helper'
export const getPurchare = createAsyncThunk('user/getCartPurchase', payloadCreator(userApi.getPurchare))
