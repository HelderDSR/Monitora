import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import { UserContext } from '../../Contexts/UserContext'
import { ReactComponent as Cadeado } from '../../Assets/cadeado.svg'
import styles from './Login.module.css'
// import { Link } from 'react-router-dom'

const LoginForm = () => {
  const login = useForm('login') //Validacao do formulário se campos estão de acordo com a validação
  const password = useForm()

  const { userLogin, error, loading } = React.useContext(UserContext)

  function handleSubmit(envet) {
    envet.preventDefault()

    if (login.validate() && password.validate()) {
      userLogin(login.value, password.value)
    }
  }

  return (
    <main className={styles.principal}>
      <div className={styles.main}>
        <Cadeado className={styles.cadeado} />
        <section className={styles.login}>
          <form onSubmit={handleSubmit}>
            <Input label="Login" type="text" name="login" {...login} />
            <Input label="Senha" type="password" name="password" {...password} />

            {loading ? <Button disabled>Carregando....</Button> : <Button>Entrar</Button>}

            {error && <p className={styles.error}>{error}</p>}
          </form>
        </section>
      </div>
    </main>
  )
}

export default LoginForm
