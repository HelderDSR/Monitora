import React from 'react'
import styles from './Paginacao.module.css'

const Paginacao = ({ totalItems, itemsPorPagina, onPageChange }) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const totalPages = Math.ceil(totalItems / itemsPorPagina)

  React.useEffect(() => {
    onPageChange(currentPage)
  }, [currentPage, onPageChange])

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <div className={styles.container}>
      <ul>
        {Array.from({ length: totalPages > 6 ? 6 : totalPages }, (_, index) => (
          <li key={index} className={currentPage === index + 1 ? styles.active : ''}>
            <button onClick={() => handlePageClick(index + 1)} disabled={currentPage === index + 1}>
              {index + 1}
            </button>
          </li>
        ))}
        {totalPages > 6 && (
          <li>
            <button onClick={handleLoadMore} disabled={currentPage === totalPages}>
              Carregar mais..
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Paginacao
