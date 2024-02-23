import React from 'react'
import { Routes, Route } from 'react-router-dom'
import EquipamentoListar from './EquipamentoListar'

const Equipamento = () => {
  return (
    <Routes>
      <Route path="/*" element={<EquipamentoListar />} />
    </Routes>
  )
}

export default Equipamento
