import React from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { logado } = React.useContext(UserContext)
  if (logado === true) return children
  else if (logado === false || logado === null) return <Navigate to="/login" />
  else return null
}

export default ProtectedRoute
