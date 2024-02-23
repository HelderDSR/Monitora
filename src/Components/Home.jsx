import React from 'react'
import Head from './Helper/Head'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.home}>
      <Head title="Home" description="Está é a home do sistema monitora" />
      Home
    </div>
  )
}

export default Home
