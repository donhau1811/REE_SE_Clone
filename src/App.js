/* eslint-disable no-unused-vars */
// ** Router Import
import Router from './router/Router'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPermissionsbyUserId } from './redux/actions/auth'
import { isEqual } from 'lodash'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPermissionsbyUserId())
  }, [])

  const permissions = useSelector((state) => state.auth?.permissions, isEqual)

  return permissions?.length > 0 && <Router />
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
