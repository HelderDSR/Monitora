import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  const [anoAtual, setAnoAtual] = React.useState(new Date().getFullYear())

  React.useEffect(() => {
    // Atualizar o ano atual apenas uma vez quando o componente for montado
    setAnoAtual(new Date().getFullYear())
  }, [])
  return (
    <div className={styles.footer}>
      <p>&copy; 2023 - {anoAtual} - Alguns direitos reversados.</p>
    </div>
  )
}

export default Footer
