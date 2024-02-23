import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SiteTable.module.css'

const SiteTable = ({ sites, onSiteChange }) => {
  const [site, setSite] = React.useState('')

  React.useEffect(() => {
    onSiteChange(site)
  }, [site, onSiteChange])

  if (!sites || sites.length === 0) {
    return <p>Nenhum Local / site encontrado.</p>
  }

  const handleSelecione = ({ target }) => {
    const site = sites.find((item) => item.nome === target.textContent)
    setSite(site)
  }

  function dataFormatada(dataString) {
    const data = new Date(dataString)
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0') // Os meses são baseados em zero
    const ano = data.getFullYear()
    const dataFormatada = `${dia} /${mes} /${ano}`
    return dataFormatada
  }

  const headers = Object.keys(sites[0])

  return (
    <div className={styles.wrapper}>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <caption>Lista de Sites Cadastrados</caption>
          <thead>
            <tr>
              {headers.map((header) => {
                if (header === 'id') {
                  return null
                }
                if (header === 'updatedAt') {
                  return null
                }

                if (header === 'createdAt') {
                  return (
                    <th key={header}>
                      <Link to={`/site?sort=${header}`} target="_self">
                        CRIADO-EM
                      </Link>
                    </th>
                  )
                } else {
                  return (
                    <th key={header}>
                      <Link to={`/site?sort=${header}`} target="_self">
                        {header.toUpperCase()}
                      </Link>
                    </th>
                  )
                }
              })}
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => (
              <tr key={site.nome}>
                {headers.map((header) => {
                  if (header === 'id') {
                    return null
                  }
                  if (header === 'updatedAt') {
                    return null
                  }
                  if (header === 'nome') {
                    return (
                      <td data-cell={header} key={header} onClick={handleSelecione}>
                        {site[header]}
                      </td>
                    )
                  }
                  if (header === 'createdAt') {
                    return (
                      <td data-cell="criado-em" key={header}>
                        {dataFormatada(site[header])}
                      </td>
                    )
                  } else {
                    return (
                      <td data-cell={header} key={header}>
                        {site[header]}
                      </td>
                    )
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SiteTable
