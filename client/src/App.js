import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './pages/Login';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import Header from './components/Header';

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
    {pathname !== '/login' && <Header />}
    <Container style={{ marginTop: 24 }}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/tasks" component={TaskList} />
        <Route path="/tasks/:id" component={TaskDetails} />
        <Redirect to="/login" />
      </Switch>
    </Container>
    </>
  );
}