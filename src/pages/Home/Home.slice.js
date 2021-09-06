import { createAsyncThunk } from '@reduxjs/toolkit'
import CategoriesApi from 'src/api/category'
import productApi from 'src/api/product.api'
import { payloadCreator } from 'src/utils/helper'

export const getCategories = createAsyncThunk('home/getCategories', payloadCreator(CategoriesApi.getCategories))
export const getProducts = createAsyncThunk('home/getProducts', payloadCreator(productApi.getProducts))
