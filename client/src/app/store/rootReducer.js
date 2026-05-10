import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/slices/authSlice'

export default combineReducers({
  auth: authReducer,
})
