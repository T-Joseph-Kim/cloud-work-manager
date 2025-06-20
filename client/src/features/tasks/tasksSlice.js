import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => (await axios.get('/api/tasks')).data
)

// fetch a single task
export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (id) => (await axios.get(`/api/tasks/${id}`)).data
)

// update a task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, changes }) => (await axios.put(`/api/tasks/${id}`, changes)).data
)

// delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await axios.delete(`/api/tasks/${id}`)
    return id
  }
)

// create a new task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task) => (await axios.post('/api/tasks', task)).data
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, { payload }) => {
        state.items = payload
        state.status = 'succeeded'
      })
      .addCase(fetchTasks.pending, state => { state.status = 'loading' })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })

      .addCase(fetchTaskById.fulfilled, (state, { payload }) => {
        // upsert single task
        const idx = state.items.findIndex(t => t.id === payload.id)
        if (idx !== -1) state.items[idx] = payload
        else state.items.push(payload)
      })

      .addCase(updateTask.fulfilled, (state, { payload }) => {
        const idx = state.items.findIndex(t => t.id === payload.id)
        if (idx !== -1) state.items[idx] = payload
      })

      .addCase(deleteTask.fulfilled, (state, { payload: id }) => {
        state.items = state.items.filter(t => t.id !== id)
      })

      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.items.push(payload)
      })
  }
})

export const selectAllTasks = state => state.tasks.items
export const selectTaskById = (state, id) =>
  state.tasks.items.find(t => t.id === id)

export default tasksSlice.reducer
