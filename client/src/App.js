import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@mui/material';
import SignIn from './pages/SignIn';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';

export default function App() {
  return (
    <Container style={{ marginTop: 24 }}>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/tasks" component={TaskList} />
        <Route path="/tasks/:id" component={TaskDetails} />
        <Redirect to="/signin" />
      </Switch>
    </Container>
  );
}