import React from 'react'
import styles from './Table.module.css'
import { Link } from 'react-router-dom'
const Table = ({ colaboradores }) => {
  if (!colaboradores || colaboradores.length === 0) {
    return <p>Nenhum colaborador encontrado.</p>
  }

  const headers = Object.keys(colaboradores[0])

  return (
    //
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header) => {
            if (header === 'is_ativo') {
              return (
                <th key={header}>
                  <Link to={`/colaborador?sort=${header}`} target="_self">
                    ATIVO
                  </Link>
                </th>
              )
            } else if (header === 'localsite') {
              return <th key={header}>{header.toUpperCase()}</th>
            } else {
              return (
                <th key={header}>
                  <Link to={`/colaborador?sort=${header}`} target="_self">
                    {header.toUpperCase()}
                  </Link>
                </th>
              )
            }
          })}
        </tr>
      </thead>
      <tbody>
        {colaboradores.map((colaborador) => (
          <tr key={colaborador.login}>
            {headers.map((header) => {
              if (header === 'login') {
                return (
                  <td key={header}>
                    <Link to={`update?login=${colaborador.login}`}>{colaborador[header]}</Link>{' '}
                  </td>
                )
              }
              if (header === 'is_ativo') {
                return <td key={header}>{colaborador[header] ? 'Ativo' : 'Inativo'}</td>
              } else if (header === 'localsite') {
                // Se o header for 'localsite', imprima os dados específicos
                return (
                  <td key={header}>
                    {/* ID: {colaborador.localsite.id}, Nome:  */}
                    {colaborador.localsite.nome}
                  </td>
                )
              } else {
                return <td key={header}>{colaborador[header]}</td>
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
