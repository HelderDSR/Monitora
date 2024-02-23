import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginForm from './LoginForm'
import { UserContext } from '../../Contexts/UserContext'

const Login = () => {
  const { logado } = React.useContext(UserContext)
  if (logado === true) return <Navigate to="/" />

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
  )
}

export default Login
