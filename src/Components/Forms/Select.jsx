import React from 'react'
import styles from './Select.module.css'

const Select = ({ labelName, name, select, setSelect, locais, error }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.local}>
        {labelName}
        <select className={styles.selection} name={name} id={name} value={select} onChange={({ target }) => setSelect(target.value)}>
          <option value="" disabled>
            Selecione
          </option>
          {locais &&
            locais.map((local) => {
              return (
                <option key={local.id} value={local.id}>
                  {local.nome}
                </option>
              )
            })}
        </select>
        {/* {select} */}
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Select
