import React, { useState } from 'react'
import { Typography, Alert } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginContainer from '../components/Login/LoginContainer'
import LoginHeader    from '../components/Login/LoginHeader'
import LoginForm      from '../components/Login/LoginForm'
import { login }      from '../features/auth/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const history  = useHistory()
  const { status, error } = useSelector(state => state.auth)
  const [form, setForm] = useState({ employeeId: '', password: '' })

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    const result = await dispatch(login(form))
    if (login.fulfilled.match(result)) {
      history.push('/home')
    }
  }

  return (
    <LoginContainer>
      <LoginHeader />

      <Typography component="h2" gutterBottom sx={{ fontSize: 30 }}>
        Login
      </Typography>

      {status === 'error' && <Alert severity="error">{error}</Alert>}

      <LoginForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </LoginContainer>
  )
}
