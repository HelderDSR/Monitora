import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ColaboradorListar from './ColaboradorListar'
import ColaboradorCadastrar from './ColaboradorCadastrar'
import ColaboradorUpdate from './ColaboradorUpdate'

const Colaborador = () => {
  return (
    <Routes>
      <Route path="/*" element={<ColaboradorListar />} />
      <Route path="adicionar" element={<ColaboradorCadastrar />} />
      <Route path="update" element={<ColaboradorUpdate />} />
    </Routes>
  )
}

export default Colaborador
