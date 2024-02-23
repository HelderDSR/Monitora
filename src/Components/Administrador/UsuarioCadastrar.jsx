import React from 'react'
import Head from '../Helper/Head'
import { useNavigate } from 'react-router-dom'
import styles from './UsuarioCadastrar.module.css'
import { ReactComponent as Addusers } from '../../Assets/add-user.svg'
import { ReactComponent as Detalhe } from '../../Assets/detalhe.svg'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Select from '../Forms/Select'
import useColaborador from '../../Hooks/useColaboradorForm'
import { getLocalSites } from '../../services/api/localSite'
import { create } from '../../services/api/usuario/api'

const UsuarioCadastrar = () => {
  const [select, setSelect] = React.useState('')
  const [locais, setLocal] = React.useState(null)
  const [isChecked, setChecked] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState({})
  const navigate = useNavigate()

  const nome = useColaborador('nome')
  const login = useColaborador('login')
  const senha = useColaborador('senha')

  React.useEffect(() => {
    const buscar = async () => {
      setError(null)
      try {
        const response = await getLocalSites()
        if (response.status === 200) {
          setLocal(response.data)
        } else {
          throw new Error(response.error)
        }
      } catch (error) {
        setError(error)
      } finally {
        setError(null)
      }
    }
    buscar()
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await create(select, user)
        if (response.status === 201) {
          navigate('/admin')
        }
      } catch (error) {
        if (error.response.status === 400) {
          setError(error.response.data.error)
        } else if (error.response.status === 500) {
          setError(error.response.data.error)
        } else {
          setError('Ocorreu um erro do nosso lado, contate o suporte ou desenvolvedor!')
        }
      } finally {
        setLoading(false)
        setError(null)
      }
    }
    if (user.nome && user.login && user.senha_virtual) {
      fetchData()
    }
  }, [user, navigate, select])

  const handleCheckboxChange = () => {
    setChecked((prevChecked) => !prevChecked)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (nome.validate() && login.validate() && senha.validate() && select) {
      setUser((user) => ({
        ...user,
        nome: nome.value,
        login: login.value.toLowerCase(),
        senha_virtual: senha.value,
        is_admin: isChecked,
      }))
    } else if (select === '') {
      setError('Selecione o local')
    }
  }

  return (
    <div className={styles.estrutura}>
      <Head title="Cadastro" description="Página de cadastro de usuário do sistema" />
      <div className={styles.detalhe}>
        <Detalhe />
      </div>
      <div className={styles.titulo}>
        <h1>Cadastro de Usuário</h1>
      </div>
      <article className={styles.article}>
        <Addusers />
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input label="nome" type="text" placeholder="Name do usuário" {...nome} />
          <div className={styles.conta}>
            <Input label="login" placeholder="informe login" {...login} />
            <div className={styles.toggleContainer}>
              <input className={styles.toggle} id="toggle" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              <label htmlFor="toggle" className={styles.toggleLabel}></label>
              <span className={styles.description}>{isChecked ? 'Conta administrador' : 'Conta normal'}</span>
            </div>
          </div>
          <Input label="Senha" type="password" placeholder="informe a senha" {...senha} />
          <Select labelName="Local" name="local" select={select} setSelect={setSelect} locais={locais} error={error} />
          <div className={styles.button}>{loading ? <Button disabled>Cadastrando....</Button> : <Button>Cadastrar</Button>}</div>
        </form>
      </article>
    </div>
  )
}

export default UsuarioCadastrar
