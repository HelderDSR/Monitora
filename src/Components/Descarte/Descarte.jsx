import React from 'react'
import styles from './Descarte.module.css'
import Head from '../Helper/Head'
import { ReactComponent as Detalhe } from '../../Assets/detalhe.svg'
import { ReactComponent as PDF } from '../../Assets/pdf.svg'
import { ReactComponent as EXCELL } from '../../Assets/excell.svg'
import { ReactComponent as LogoDescarte } from '../../Assets/logo_descarte.svg'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Select from '../Forms/Select'
import Table from '../Colaborador/Table'
import DescarteListar from './DescarteListar'

const Descarte = () => {
  const [select, setSelect] = React.useState('')

  const opcao = [
    {
      id: 1,
      nome: 'PATRIMÔNIO',
    },
    {
      id: 2,
      nome: 'SERIAL',
    },
  ]

  return (
    <>
      <Head title="Descarte" description=" Página para lista todos os itens para descarte do sistema." />
      <section className={styles.section}>
        <div className={styles.detalhe}>
          <Detalhe />
        </div>
        <main className={styles.content}>
          <div className={styles.menu}>
            <div className={styles.titulo}>
              <LogoDescarte />
              <h1>Descarte</h1>
            </div>
            <form className={styles.forms}>
              <Input placeholder="Buscar por..." />
              <Select select={select} setSelect={setSelect} locais={opcao} />
              <Button>Buscar</Button>
            </form>
            <div className={styles.exportar}>
              <PDF />
              <EXCELL />
            </div>
          </div>
          <DescarteListar />
        </main>
      </section>
    </>
  )
}

export default Descarte
