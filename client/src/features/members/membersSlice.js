import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fetch all members with createAsyncThunk
// API call, HTTP GET request to /api/members using axios
export const fetchMembers = createAsyncThunk(
  'members/fetchMembers',
  async () => {
    const resp = await axios.get('/api/members')
    return Object.values(resp.data) // Convert object to array
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

// piece of state management logic and defines members slice behavior
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
      // reducer that handles pending state of fetchMembers async
      .addCase(fetchMembers.pending, state => {
        state.status = 'loading'
      })

      // reducer that handles the fulfilled state of fetchMembers async
      .addCase(fetchMembers.fulfilled, (state, { payload }) => {
        state.items = payload // array of members
        state.status = 'succeeded'
        state.entities = payload.reduce((m, member) => { // map of members, id as key]
          m[member.id] = member
          return m
        }, {})
      })

      // handles rejected fetchMembers async thunk, sets status to error
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })
      
      // adds fetched member to entities object and items array if not already present
      .addCase(fetchMember.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = payload
        if (!state.items.find(m => m.id === payload.id)) {
          state.items.push(payload)
        }
      })
  }
})
// selectors to access members state
export const selectAllMembers   = state => state.members.items // retrives the items property from the members slice as an array (items)
export const selectMemberEntities = state => state.members.entities // retrieves the entities property from the members slice as an object (entities)

// exports reducer function to be used in store.js
export default membersSlice.reducer
