import { useState } from 'react';
import { Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LoginContainer from '../components/Login/LoginContainer';
import LoginHeader    from '../components/Login/LoginHeader';
import LoginForm      from '../components/Login/LoginForm';

export default function Login() {
  const [form, setForm] = useState({ employeeId: '', password: '' });
  const history = useHistory();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignIn = () =>
    history.push('/home');

  return (
    <LoginContainer>
      <LoginHeader />

      <Typography
        component="h2"
        gutterBottom
        sx={{ fontSize: '30px' }}
      >
        Login
      </Typography>

      <LoginForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSignIn}
      />
    </LoginContainer>
  );
}
