import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from '../auth/authSlice'

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (memberId) => {
    const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/members/${memberId}`)
    return resp.data    // { id, firstName, lastName, dob }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data:   null,
    status: 'idle',
    error:  null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data   = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error  = action.error.message
      })
      .addCase(logout, state => {
        state.data   = null
        state.status = 'idle'
        state.error  = null
      })
  }
})

export default profileSlice.reducer
