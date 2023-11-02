import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children }) => {
  // its children is the dashboard comp so when the isUser True it renders the dashboard other wise
  // it redirects to the login page
  const { isAuthenticated, user } = useAuth0()
  const isUser = isAuthenticated && user
  if (!isUser) {
    return <Navigate to="/login"></Navigate>
  }
  return children
 
}
export default PrivateRoute
