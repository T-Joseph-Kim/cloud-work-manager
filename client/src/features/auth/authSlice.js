import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { fetchProfile } from '../profile/profileSlice'

export const login = createAsyncThunk(
  'auth/login',
  async ({ employeeId, password }, thunkAPI) => {
    try {
      const resp = await axios.post('/api/login', { id: employeeId, password })
      const { id } = resp.data
      // immediately load profile for this user
      thunkAPI.dispatch(fetchProfile(id))
      return { id }
    } catch (err) {
      if (err.response?.status === 401) {
        return thunkAPI.rejectWithValue('Incorrect employee ID or password')
      }
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,    // { id: string }
    status:      'idle',  // 'idle' | 'loading' | 'error'
    error:       null
  },
  reducers: {
    logout(state) {
      state.currentUser = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status      = 'idle'
        state.currentUser = { id: action.payload.id }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error'
        state.error  = action.payload || action.error.message
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer