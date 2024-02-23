import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Head from '../Helper/Head'
import { ReactComponent as Site } from '../../Assets/site.svg'
import { ReactComponent as AdmHome } from '../../Assets/add_home.svg'
import styles from './SiteListar.module.css'
import { getLocalSites } from '../../services/api/localSite'
import Table from './SiteTable'
import Paginacao from '../Helper/Paginacao'

const SiteListar = () => {
  const [sites, setSites] = React.useState('')
  const [siteAtual, setSiteAtual] = React.useState('')
  const [erro, setErro] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [tatalIntemInDataBase, setTotalIntemInDataBase] = React.useState(0)
  const intemsPorPage = 25
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const sort = queryParams.get('sort') || 'nome'
  const navigate = useNavigate()

  React.useEffect(() => {
    const getSites = async (sort, page) => {
      const response = await getLocalSites(sort, page)
      // console.log(response)
      if (response.status === 200) {
        // Acesso ao cabeçalho 'X-Total-Count' da resposta
        const totalCountFromHeader = response.headers.get('TotalLocal')
        setTotalIntemInDataBase(parseInt(totalCountFromHeader) || 0)
        setSites(response.data)
      }
    }
    getSites(sort, currentPage)
  }, [sort, currentPage])

  React.useEffect(() => {
    if (siteAtual) {
      navigate(`update/${siteAtual.id}`)
    }
  }, [siteAtual, navigate])

  function handleBuscar(event) {
    event.preventDefault()
    if (event.target[0].value) {
      const site = sites.filter((item) => item.nome.toLowerCase().includes(event.target[0].value.toLowerCase()))
      if (site) {
        setErro('')
        setSites(site)
      } else {
        setErro('Site / local não localizado, verifique nome')
      }
    } else {
      setErro('Preencher Campo de busca..')
    }
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSiteAtual = (site) => {
    setSiteAtual(site)
  }
  return (
    <>
      <Head title="Sites" description="Lista de todos os sites cadastrados." />
      <div className={styles.estrutura}>
        <main className={styles.principal}>
          <section className={styles.titulo}>
            <div className={styles.nomeSite}>
              <Site />
              <h1>Adminitrar sites</h1>
            </div>
            <div className={styles.buscarSite}>
              <Link to="cadastro">
                <AdmHome /> Novo Site
              </Link>
              <form className={styles.form} onSubmit={handleBuscar}>
                <input type="text" placeholder="buscar site" />
                <button>Localizar</button>
              </form>
            </div>
            <div className={styles.erro}>{erro && <p>{erro}</p>}</div>
          </section>
          <section className={styles.tabela}>
            <hr />
            {sites && <Table sites={sites} onSiteChange={handleSiteAtual} />}
            {!sites && <h1>Não existe Site / Local cadastrado.</h1>}
          </section>
        </main>
        <div className={styles.paginacao}>
          <Paginacao totalItems={tatalIntemInDataBase} itemsPorPagina={intemsPorPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  )
}

export default SiteListar
