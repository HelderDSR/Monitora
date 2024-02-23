import React from 'react'
import { api } from '../services/Api'
import { createSession, validaToken } from '../services/api/usuario/api'
import { useNavigate } from 'react-router-dom'

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
  const [user, setUser] = React.useState(null)
  const [logado, setLogado] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()

  const userLogout = React.useCallback(
    async function () {
      setUser(null)
      setError(null)
      setLoading(false)
      setLogado(null)
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      navigate('/login')
    },
    [navigate]
  )

  async function userLogin(login, password) {
    try {
      setError(null)
      setLoading(true)
      const response = await createSession(login, password)
      window.localStorage.setItem('token', response.data.token)
      window.localStorage.setItem('user', JSON.stringify(response.data.user))
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`
      setUser(response.data.user)
      setLogado(true)
      navigate('/')
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          // console.error(error.response.data.Error)
          // Execute a lógica de tratamento de erro específica para 401 aqui, como redirecionar para a página de login
          setError(error.response.data.Error)
          setLogado(false)
        } else {
          console.error('Erro na resposta do servidor:', error.response.data)
          console.error('Status do erro:', error.response.status)
        }
      } else if (error.request) {
        // A solicitação foi feita, mas não houve resposta do servidor
        console.error('Não houve resposta do servidor')
      } else {
        // Algo aconteceu durante a configuração da solicitação que causou o erro
        console.error('Erro durante a configuração da solicitação:', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      const usuario = window.localStorage.getItem('user')
      if (token && usuario) {
        try {
          setError(null)
          setLoading(true)
          api.defaults.headers.Authorization = `Bearer ${token}`
          const response = await validaToken(token)
          if (!response.statusText === 'OK') throw new Error('Token inválido.')
          setUser(JSON.parse(usuario))
          setLogado(true)
        } catch (error) {
          // console.log(error.response)
          userLogout()
        } finally {
          setLoading(false)
        }
      }
    }
    autoLogin()
  }, [userLogout])

  return <UserContext.Provider value={{ userLogin, userLogout, user, error, loading, logado }}>{children}</UserContext.Provider>
}
