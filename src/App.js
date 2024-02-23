import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import Login from './Components/Login/Login'
import { UserStorage } from './Contexts/UserContext'
import Colaborador from './Components/Colaborador/Colaborador'
import Descarte from './Components/Descarte/Descarte'
import Administrador from './Components/Administrador/Administrador'
import ProtectedRoute from './Components/Helper/ProtectedRoute'
import ProtectedRouteAdmin from './Components/Helper/ProtectedRouteAdmin'
import Usuario from './Components/Usuario/Usuario'
import Site from './Components/Site/Site'
import Equipamento from './Components/Equipamento/Equipamento'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="colaborador/*"
              element={
                <ProtectedRoute>
                  <Colaborador />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="descarte/*"
              element={
                <ProtectedRoute>
                  <Descarte />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="equipamento/*"
              element={
                <ProtectedRoute>
                  <Equipamento />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="usuario/*"
              element={
                <ProtectedRoute>
                  <Usuario />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="site/*"
              element={
                <ProtectedRouteAdmin>
                  <Site />
                </ProtectedRouteAdmin>
              }
            ></Route>
            <Route
              path="admin/*"
              element={
                <ProtectedRouteAdmin>
                  <Administrador />
                </ProtectedRouteAdmin>
              }
            ></Route>
            <Route path="login/*" element={<Login />}></Route>
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
