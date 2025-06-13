import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import Header from './components/Header';
import Profile from './pages/Profile';

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
    {pathname !== '/login' && <Header />}
    <Container style={{ marginTop: 24 }}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={TaskList} />
        <Route path="/tasks/:id" component={TaskDetails} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/login" />
      </Switch>
    </Container>
    </>
  );
}