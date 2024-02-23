import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SiteListar from './SiteListar'
import SiteCadastro from './SiteCadastro'
import SiteUpdate from './SiteUpdate'

const Site = () => {
  return (
    <Routes>
      <Route path="/*" element={<SiteListar />} />
      <Route path="cadastro" element={<SiteCadastro />} />
      <Route path="update/:id" element={<SiteUpdate />} />
    </Routes>
  )
}

export default Site
