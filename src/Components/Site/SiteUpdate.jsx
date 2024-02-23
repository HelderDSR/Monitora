import React from 'react'
import styles from './SiteUpdate.module.css'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import { ReactComponent as Home } from '../../Assets/apartment.svg'
import Head from '../Helper/Head'
import { show, update, delet } from '../../services/api/localSite'
import { useParams, useNavigate } from 'react-router-dom'

function SiteUpdate() {
  const [site, setSite] = React.useState('')
  const [updateSite, setUpdateSite] = React.useState(false)
  const [deletar, setDelet] = React.useState(false)
  const { id } = useParams()

  const navigate = useNavigate()

  const handleButtonUpdate = () => {
    setDelet(false)
    setUpdateSite(true)
  }

  const handleButtonDelete = () => {
    setUpdateSite(false)
    const confirma = window.confirm('Tem certeza que deseja remover?')
    if (confirma) {
      setDelet(true)
    }
  }

  function onHandleSubmit(event) {
    event.preventDefault()
    if (updateSite) {
      const atualizar = async (id, data) => {
        const response = await update(id, data)

        if (response.status === 200) {
          navigate('site')
        }
      }
      atualizar(site.id, site)
    } else if (deletar) {
      const remover = async (id) => {
        const response = await delet(id)

        if (response.status === 200) {
          console.log(site.id);
          navigate('site')
        }
      }
      remover(site.id)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSite((prevSite) => ({
      ...prevSite,
      [name]: value,
    }))
  }

  React.useEffect(() => {
    if (id) {
      const buscarSite = async (id) => {
        const response = await show(id)

        if (response.status === 200) {
          setSite(response.data)
        }
      }
      buscarSite(id)
    }
  }, [id])

  return (
    <main className={styles.main}>
      <Head title="Sites-Update" description="Atualizar / excluir site cadastrado." />
      <h1 className={styles.titulo}>Update / Delete - Localidade</h1>
      <hr className={styles.hr} />
      <section className={styles.section}>
        <div className={styles.imagem}>
          <Home />
        </div>
        <form className={styles.form} onSubmit={onHandleSubmit}>
          <Input label="Nome da Localidade" name="nome" type="text" id="nome" value={site.nome || ''} onChange={handleInputChange} />
          <div className={styles.dadosForm}>
            <Input label="CEP" id="cep" type="text" name="cep" value={site.cep || ''} onChange={handleInputChange} />
            <Input label="Estado" name="estado" type="text" id="estado" value={site.estado || ''} onChange={handleInputChange} />
          </div>
          <Input label="Rua" name="rua" type="text" id="rua" value={site.rua || ''} onChange={handleInputChange} />
          <div className={styles.dadosForm}>
            <Input label="Número" name="numero" type="text" id="numero" value={site.numero || ''} onChange={handleInputChange} />
            <Input label="CNPJ" name="cnpj" type="text" id="cpnj" value={site.cnpj || ''} onChange={handleInputChange} />
          </div>
          <Input label="Bairro" name="bairro" type="text" id="bairro" value={site.bairro || ''} onChange={handleInputChange} />
          <div className={styles.button}>
            <Button onClick={handleButtonUpdate}>Atualizar</Button>
            <Button onClick={handleButtonDelete}>Excluir</Button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default SiteUpdate
