import React from 'react'
import styles from './DescarteListar.module.css'
import { ReactComponent as Restaurar } from '../../Assets/restaurar.svg'
import { Link } from 'react-router-dom'

const DescarteListar = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Patrimônio</th>
          <th>Serial</th>
          <th>Login</th>
          <th>Data</th>
          <th>Restaurar</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td>MSG0000012345</td>
          <td>FSD546216</td>
          <td>jesiqueira</td>
          <td>20/11/2015</td>
          <td>
            <Link to='/equipamento'>
            <Restaurar/>
            </Link>
            </td>
        </tr>
      <tr>
          <td>MSG0000012345</td>
          <td>FSD546217</td>
          <td>jesiqueira</td>
          <td>23/11/2015</td>
          <td className={styles.restaurar}>
            <Link to='/equipamento'>
            <Restaurar/>
            </Link>
            </td>
        </tr>
      <tr>
          <td>MSG0000012345</td>
          <td>FSD546218</td>
          <td>jesiqueira</td>
          <td>25/11/2015</td>
          <td>
            <Link to='/equipamento'>
            <Restaurar/>
            </Link>
            </td>
        </tr>
         </tbody>
    </table>
  )
}

export default DescarteListar
