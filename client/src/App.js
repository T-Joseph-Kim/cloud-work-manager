import { useState, useEffect } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { Toolbar, Container } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from './features/profile/profileSlice'
import LoadingScreen from './components/LoadingScreen'
import Login from './pages/Login'
import TaskList from './pages/TaskList'
import EditTask from './pages/EditTask'
import Header from './components/Header'
import Profile from './pages/Profile'

export default function App() {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const currentUserId = useSelector(s => s.auth.currentUser?.id)
  const profileStatus = useSelector(s => s.profile.status)

  useEffect(() => {
    if (currentUserId && profileStatus !== 'succeeded') {
      dispatch(fetchProfile(currentUserId))
    }
  }, [currentUserId, profileStatus, dispatch])

  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(id)
  }, [pathname])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      {pathname !== '/login' && (
        <>
          <Header />
          <Toolbar />
        </>
      )}
      <Container maxWidth={false} disableGutters>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={TaskList} />
          <Route path="/tasks/:id" component={EditTask} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/login" />
        </Switch>
      </Container>
    </>
  )
}
