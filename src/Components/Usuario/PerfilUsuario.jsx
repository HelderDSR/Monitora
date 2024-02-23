import React from 'react'
import styles from './PerfilUsuario.module.css'
import { UserContext } from '../../Contexts/UserContext'
import Head from '../Helper/Head'
import { ReactComponent as Detalhe } from '../../Assets/detalhe.svg'
import { ReactComponent as SVGUsuario } from '../../Assets/userUpdate.svg'
import { show, update } from '../../services/api/usuario/api'
import Input from '../Forms/Input'
import Button from '../Forms/Button'

const PerfilUsuario = () => {
  const { user } = React.useContext(UserContext)
  const [usuario, setUsuario] = React.useState('')
  const [atualizado, setAtualizado] = React.useState(false)
  const [password, setPassword] = React.useState()
  const [confirm_password, setConfirm_password] = React.useState()
  const [erro, setErro] = React.useState('')
  const id = user.id

  React.useEffect(() => {
    const getUsuario = async () => {
      const response = await show(id)
      if (response.status === 200) {
        setUsuario(response.data)
      }
    }
    getUsuario()
  }, [id])
  React.useEffect(() => {
    if (password && confirm_password) {
      setUsuario((prev) => {
        const novo = {
          ...prev,
          senha_virtual: password,
        }
        return novo
      })
    }
  }, [password, confirm_password])

  function handleChange({ target }) {
    const { name, value } = target
    if (name === 'password') {
      setPassword(value)
    } else if (name === 'confirm_password') {
      setConfirm_password(value)
    } else {
      setUsuario((prevUsuario) => ({
        ...prevUsuario,
        [name]: value,
      }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=_!]{8,}$/
    if (password || confirm_password) {
      setErro('')
      setAtualizado(false)
      if (password && confirm_password) {
        if (password === confirm_password) {
          if (!regex.test(password) && !regex.test(confirm_password)) {
            console.log(password)
            console.log(confirm_password)
            setErro('Senha deve ter: Ao menos 1 letra, 1 digito e 5 caracter de letras ou digitos.')
          } else {
            console.log('User: ', usuario)
            const response = await update(usuario.id, usuario)
            if (response.status === 200) {
              setAtualizado(true)
            }
          }
        } else {
          setErro('As senha não são iguais.')
        }
      } else {
        setErro('Senhas não confere.')
      }
    } else {
      setErro('')
      const response = await update(usuario.id, usuario)
      if (response.status === 200) {
        setAtualizado(true)
      }
    }
  }

  return (
    <>
      <Head title="Usuario" description="Páginas com dados do usuário logado." className={styles.head} />
      <div className={styles.estrutura}>
        <div className={styles.detalhe}>
          <Detalhe />
        </div>
        <main className={styles.main}>
          <div className={styles.titulo}>
            <h1>Meus Dados</h1>
            {atualizado && <p>Usuário atualizado conforme solicitado.</p>}
          </div>
          <section className={styles.conteudo}>
            <div className={styles.imagem}>
              <SVGUsuario />
            </div>
            <div className={styles.dados}>
              <form onSubmit={handleSubmit}>
                <Input label="Nome" name="nome" id="nome" value={usuario.nome || ''} onChange={handleChange} />
                <Input label="Login" name="login" value={usuario.login || ''} onChange={handleChange} />
                <Input label="Nova Senha" type="password" name="password" onChange={handleChange} />
                <Input label="Confirme a senha" type="password" name="confirm_password" onChange={handleChange} />
                {erro && <p className={styles.erro}>{erro}</p>}
                <Button>Atualizar</Button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default PerfilUsuario
