import React from 'react'
import styles from './UsuariosListar.module.css'
import Head from '../Helper/Head'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as Detalhe } from '../../Assets/detalhe.svg'
import { ReactComponent as Detalhe1 } from '../../Assets/adm_user_listar.svg'
import { ReactComponent as DelatheAddUser } from '../../Assets/adm_user_add.svg'
import { ReactComponent as Penson } from '../../Assets/person.svg'
import Button from '../Forms/Button'
import Input from '../Forms/Input'
import Check from '../Forms/Check'
import Table from './Table'
import Paginacao from '../Helper/Paginacao'
import { getUsuarios, update } from '../../services/api/usuario/api'

const UsuariosListar = () => {
  const [admCheck, setAdmCheck] = React.useState(false)
  const [contaAtivaCheck, setContaAtivaCheck] = React.useState(false)
  const [users, setUsers] = React.useState('')
  const [userAtual, setUserAtual] = React.useState('')
  const [useForm, setUseForm] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [tatalIntemInDataBase, setTotalIntemInDataBase] = React.useState(0)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [userFilter, setUserFilter] = React.useState('')
  const [erro, setErro] = React.useState('')
  const intemsPorPage = 25
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const sort = queryParams.get('sort') || 'nome'
  const navigate = useNavigate()

  const handleAdmCheckChange = () => {
    setAdmCheck((prevChecked) => !prevChecked)
  }
  const handleContaAtivaCheckChange = () => {
    setContaAtivaCheck((prevChecked) => !prevChecked)
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleUserAtual = (user) => {
    setUserAtual(user)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (senha) {
      setUseForm({
        is_admin: admCheck,
        is_ativo: contaAtivaCheck,
        senha_virtual: senha,
      })
    } else {
      setUseForm({
        is_admin: admCheck,
        is_ativo: contaAtivaCheck,
      })
    }
  }

  const handleBuscar = (event) => {
    event.preventDefault()
    const user = [users.find((user) => user.login === event.target[0].value)]
    if (user[0]) {
      setErro('')
      setUserFilter(user)
      event.target[0].value = ''
    } else {
      setErro('Usuário não localizado, verifique Login!')
    }
  }

  React.useEffect(() => {
    if (userFilter) {
      setUsers(userFilter)
    } else {
      const listarUsuario = async (sort, page) => {
        try {
          const response = await getUsuarios(sort, page)
          if (response.status === 200) {
            // Acesso ao cabeçalho 'X-Total-Count' da resposta
            const totalCountFromHeader = response.headers.get('TotalUsers')
            setTotalIntemInDataBase(parseInt(totalCountFromHeader) || 0)
            // console.log(totalCountFromHeader)
            setUsers(response.data)
          } else {
            throw new Error(response.data.error)
          }
        } catch (error) {
          console.log(error)
        }
      }
      listarUsuario(sort, currentPage)
    }
  }, [sort, currentPage, userFilter])

  React.useEffect(() => {
    setAdmCheck(userAtual.is_admin)
    setContaAtivaCheck(userAtual.is_ativo)
  }, [userAtual])

  React.useEffect(() => {
    const atualizar = async () => {
      if (useForm && userAtual) {
        try {
          const response = await update(userAtual.id, useForm)
          if (response.status === 200) {
            navigate('/')
            // window.location.reload()
          }
        } catch (error) {
          console.log(error)
        } finally {
          setSenha('')
        }
      }
    }
    atualizar()
  }, [useForm, userAtual, navigate])

  return (
    <>
      <Head title="Usuários" description="Página para listar todos os usuários do sistema." />
      <section className={styles.section}>
        <div className={styles.detalhe}>
          <Detalhe />
        </div>
        <div className={styles.titulo}>
          <div>
            <Detalhe1 />
            <h1>Adm. Usuários</h1>
          </div>
          <div>
            <Link to="cadastro">
              <DelatheAddUser /> Ad. Usuário
            </Link>
            <form onSubmit={handleBuscar}>
              <input type="text" name="buscar" id="buscar" />
              <Button>Buscar</Button>
            </form>
          </div>
        </div>
        <div className={styles.erro}>{erro && <p>{erro}</p>}</div>
      </section>
      <hr className={styles.hr} />
      <section className={styles.sectionTable}>
        <div className={styles.lista}>
          <div>
            <Table datas={users} onUserChange={handleUserAtual} />
            <div className={styles.paginacao}>
              <Paginacao totalItems={tatalIntemInDataBase} itemsPorPagina={intemsPorPage} onPageChange={handlePageChange} />
            </div>
          </div>
          <div className={styles.visualizarDados}>
            <div className={styles.dadosPerfil}>
              <div className={styles.info}>
                <div className={styles.info_foto}>
                  <Penson />
                </div>
                <div>
                  <h1>{userAtual.nome}</h1>
                  {/* <h2>
                    <span>Gestor: </span>Leonardo Vello
                  </h2> */}
                  <h3>
                    <span>Login: </span>
                    {userAtual.login}
                  </h3>
                </div>
              </div>
              <hr className={styles.hrInfo} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h3>Permissões</h3>
              <hr />
              <Check
                name="adm"
                textChecked="Administrador"
                textNotChecked="Usuário"
                isChecked={admCheck}
                handleCheckboxChange={handleAdmCheckChange}
              />
              <Check
                name="conta"
                textChecked="Conta Ativa"
                textNotChecked="Conta inativa"
                isChecked={contaAtivaCheck}
                handleCheckboxChange={handleContaAtivaCheckChange}
              />
              <div className={styles.password}>
                <Input label="Nova senha" name="password" type="password" onChange={(event) => setSenha(event.target.value)} />
              </div>
              <Button className={styles.button}>Atualizar</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default UsuariosListar
