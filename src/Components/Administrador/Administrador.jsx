import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UsuariosListar from './UsuariosListar'
import UsuarioCadastrar from './UsuarioCadastrar'

const Administrador = () => {
  return (
    <Routes>
      <Route path="/*" element={<UsuariosListar />} />
      <Route path="cadastro" element={<UsuarioCadastrar />} />
    </Routes>
  )
}

export default Administrador
