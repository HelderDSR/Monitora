import React from 'react'
import styles from './ColaboradorCadastrar.module.css'
import Head from '../Helper/Head'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import { ReactComponent as Detalhe } from '../../Assets/detalhe.svg'
import { ReactComponent as AddColaborador } from '../../Assets/addcolaborador.svg'
import useColaborador from '../../Hooks/useColaboradorForm'
import { getLocalSites } from '../../services/api/localSite'
import { useNavigate } from 'react-router-dom'
import { createColaborador } from '../../services/api/colaborador'

const ColaboradorCadastrar = () => {
  const nome = useColaborador('nome')
  const cpf = useColaborador('cpf')
  const rg = useColaborador('rg')
  const cep = useColaborador('cep')
  const estado = useColaborador('estado')
  const endereco = useColaborador('endereco')
  const bairro = useColaborador('bairro')
  const numero = useColaborador('numero')
  const cidade = useColaborador('cidade')
  const telefone = useColaborador('telefone')
  const login = useColaborador('login')
  const gestor = useColaborador('gestor')
  const setor = useColaborador('setor')
  const selecionar = useColaborador('')
  const relacao = useColaborador('relacao')

  const [locais, setLocais] = React.useState(null)
  const [opcaoSelecionada, setOpcaoSelecionada] = React.useState('')
  const [erroSelecionar, setErroSelecionar] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()

  React.useEffect(() => {
    async function sites() {
      try {
        const response = await getLocalSites()
        if (response.status === 200) {
          setLocais(response.data)
        }
      } catch (error) {
        // console.log(error)
      }
    }
    sites()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (
      nome.validate() &&
      cpf.validate() &&
      rg.validate() &&
      cep.validate() &&
      estado.validate() &&
      endereco.validate() &&
      bairro.validate() &&
      numero.validate() &&
      cidade.validate() &&
      telefone.validate() &&
      login.validate() &&
      gestor.validate() &&
      setor.validate() &&
      relacao.validate() &&
      opcaoSelecionada !== ''
    ) {
      // console.log('validado')
      setErroSelecionar('')
      const colaborador = {
        nome: nome.value,
        cpf: cpf.value,
        rg: rg.value,
        cep: cep.value,
        estado: estado.value,
        endereco: endereco.value,
        bairro: bairro.value,
        numero: numero.value,
        cidade: cidade.value,
        telefone: telefone.value,
        login: login.value.toLowerCase(),
        gestor: gestor.value,
        setor: setor.value,
        relacao: relacao.value,
      }
      try {
        setError(false)
        setLoading(true)
        const response = await createColaborador(parseInt(opcaoSelecionada), colaborador)
        if (response.status === 201) {
          navigate('/colaborador')
        }
      } catch (error) {
        // setError(true)
        // console.log(error.response.data.error)
        if (error.response) {
          if (error.response.status === 400) {
            // console.error(error.response.data.error)
            // Execute a lógica de tratamento de erro específica para 401 aqui, como redirecionar para a página de login
            setError(error.response.data.error)
          } else {
            // console.error('Erro na resposta do servidor:', error.response.data)
            // console.error('Status do erro:', error.response.status)
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
    } else if (!parseInt(opcaoSelecionada)) {
      setErroSelecionar('Campo é obrigatório.')
    } else {
      setErroSelecionar('')
    }
  }
  function handleChange(event) {
    setOpcaoSelecionada(event.target.value)
  }
  return (
    <>
      <Head title="Add Colaborador" description="Páginas para cadastro de novos colaboradores na empresa." />
      <div className={styles.estrutura}>
        <div className={styles.detalhe}>
          <Detalhe />
        </div>
        <main className={styles.content}>
          <div className={styles.titulo}>
            <AddColaborador />
            <h1>Cadastrar colaborador</h1>
          </div>
          <section className={styles.section}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <Input label="Nome" id="nome" name="nome" type="text" {...nome} />
                <div className={styles.dados1}>
                  <Input label="CPF" id="cpf" name="cpf" type="text" {...cpf} />
                  <Input label="RG" id="rg" name="rg" type="text" {...rg} />
                  <Input label="CEP" id="cep" name="cep" type="text" {...cep} />
                  <Input label="Estado" id="estado" name="estado" type="text" {...estado} />
                </div>
                <Input label="Endereco" id="endereco" name="endreco" type="text" {...endereco} />
                <div className={styles.dados2}>
                  <Input label="Bairro" id="bairro" name="bairro" type="text" {...bairro} />
                  <Input label="Número" id="numero" name="numero" type="text" {...numero} />
                  <Input label="Cidade" id="cidade" name="cidade" type="text" {...cidade} />
                </div>
              </div>
              <div>
                <Input label="Telefone" id="telefone" name="telefone" type="text" {...telefone} />
                <Input label="Login" id="login" name="login" type="text" {...login} />
                <Input label="Gestor" id="gestor" name="gestor" type="text" {...gestor} />
                <Input label="Setor" id="setor" name="setor" type="text" {...setor} />
                <label htmlFor="lecioneoOp" className={styles.local}>
                  Selecione Local
                  <select className={styles.selection} id="lecioneoOp" onChange={handleChange} defaultValue="selecione">
                    <option value="selecione" disabled>
                      selecione
                    </option>
                    {locais &&
                      locais.map((local) => (
                        <option key={local.id} value={local.id} onChange={selecionar.onChange} onBlur={selecionar.onBlur}>
                          {local.nome}
                        </option>
                      ))}
                  </select>
                </label>
                {erroSelecionar && <p className={styles.erro}>{erroSelecionar}</p>}
                <div className={styles.relacao}>
                  <Input label="Relacao" id="relacao" name="relacao" type="text" {...relacao} />
                </div>
              </div>
              {/* {opcaoSelecionada && <p>{opcaoSelecionada}</p>} */}
              <div className={styles.button}>{loading ? <Button disabled>Cadastrando....</Button> : <Button>Cadastrar</Button>}</div>

              {error && <p className={styles.erro}>{error}</p>}
            </form>
          </section>
        </main>
      </div>
    </>
  )
}

export default ColaboradorCadastrar
