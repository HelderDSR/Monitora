import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PerfilUsuario from './PerfilUsuario'

const Usuario = () => {
  return (
    <Routes>
      <Route path="/*" element={<PerfilUsuario />} />
    </Routes>
  )
}

export default Usuario
