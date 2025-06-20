import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fetch all members
export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async () => {
    const resp = await axios.get('/api/members')
    return Object.values(resp.data)
  }
)

// Fetch a single member by id
export const fetchMember = createAsyncThunk(
  'members/fetchMember',
  async (id) => {
    const resp = await axios.get(`/api/members/${id}`)
    return resp.data
  }
)

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    items: [],
    entities: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMembers.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchMembers.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = 'succeeded'
        state.entities = payload.reduce((m, member) => {
          m[member.id] = member
          return m
        }, {})
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })

      .addCase(fetchMember.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = payload
        if (!state.items.find(m => m.id === payload.id)) {
          state.items.push(payload)
        }
      })
  }
})

export const selectAllMembers   = state => state.members.items
export const selectMemberEntities = state => state.members.entities

export default membersSlice.reducer
