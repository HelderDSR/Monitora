import React from 'react'
import Head from '../Helper/Head'
import { ReactComponent as Home } from '../../Assets/apartment.svg'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import styles from './SiteCadastro.module.css'
import useColaborador from '../../Hooks/useColaboradorForm'
import { createLocalSite } from '../../services/api/localSite'
import { useNavigate } from 'react-router-dom'

function SiteCadastro() {
  const nome = useColaborador('nome')
  const cep = useColaborador('cep')
  const estado = useColaborador('estado')
  const rua = useColaborador('rua')
  const numero = useColaborador('numero')
  const cnpj = useColaborador('cnpj')
  const cidade = useColaborador('cidade')
  const bairro = useColaborador('bairro')

  const [site, setSite] = React.useState('')
  const [erro, setErro] = React.useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (
      nome.validate() &&
      cep.validate() &&
      estado.validate() &&
      rua.validate() &&
      numero.validate() &&
      cnpj.validate() &&
      cidade.validate() &&
      bairro.validate()
    ) {
      setSite((site) => ({
        ...site,
        nome: nome.value.toUpperCase(),
        cep: cep.value,
        estado: estado.value.toUpperCase(),
        rua: rua.value,
        numero: numero.value,
        cnpj: cnpj.value,
        cidade: cidade.value,
        bairro: bairro.value,
      }))
    }
  }

  React.useEffect(() => {
    const cadastrar = async () => {
      try {
        setErro('')
        const response = await createLocalSite(site)
        if (response.status === 201) {
          navigate('/site')
        }
      } catch (error) {
        setErro(error.response.data.error)
      }
    }
    if (site) {
      cadastrar()
    }
  }, [site, navigate])

  return (
    <>
      <Head title="Sites" description="Cadastro de sites / local" />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.titulo}>
            <h1>Cadastrar nova Localidade</h1>
            <hr />
          </div>
          <div className={styles.imagemHome}>
            <Home />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input label="Nome" placeholder="Call Center - São Carlos" {...nome} />
            <div className={styles.dados1}>
              <Input label="Cep" placeholder="00000-000" {...cep} />
              <Input label="Estado" placeholder="SP" {...estado} />
            </div>
            <Input label="Rua" placeholder="Rua Coronel Jose Augusto de Oliveira Salles" {...rua} />
            <div className={styles.dados1}>
              <Input label="Número" placeholder="3225" {...numero} />
              <Input label="CNPJ" placeholder="00.000.000/0000-00" {...cnpj} />
            </div>
            <div className={styles.dados1}>
              <Input label="Cidade" placeholder="São Carlos" {...cidade} />
              <Input label="Bairro" placeholder="Vila Izabel" {...bairro} />
            </div>
            {erro && <p className={styles.erro}>{erro}</p>}
            <Button>Cadastrar</Button>
          </form>
        </main>
      </div>
    </>
  )
}

export default SiteCadastro
