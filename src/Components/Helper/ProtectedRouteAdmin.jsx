import React from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { Navigate } from 'react-router-dom'

const ProtectedRouteAdmin = ({ children }) => {
  const { logado, user} = React.useContext(UserContext)
  if (logado === true && user.is_admin === true) return children
  else if (logado === false || logado === null || user.is_admin === false || user.is_admin === null) return <Navigate to="/login" />
  else return null
}

export default ProtectedRouteAdmin
