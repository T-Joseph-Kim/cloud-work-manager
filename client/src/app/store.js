// Redux store configuration for the react app's state management, allows for middleware (redux thunk)

import { configureStore } from '@reduxjs/toolkit'
import authReducer    from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import tasksReducer from '../features/tasks/tasksSlice'
import membersReducer from '../features/members/membersSlice';

export const store = configureStore({
  reducer: {
    auth:    authReducer,
    profile: profileReducer,
    tasks:   tasksReducer,
    members: membersReducer
  }
})
