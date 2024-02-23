import React from 'react'
import styles from './Check.module.css'

const Check = ({ name, isChecked, handleCheckboxChange, textChecked, textNotChecked }) => {
  return (
    <div className={styles.toggleContainer}>
      <input className={styles.toggle} id={name} type="checkbox" checked={isChecked || false} onChange={handleCheckboxChange} />
      <label htmlFor={name} className={styles.toggleLabel}></label>
      <span className={styles.description}>{isChecked ? textChecked : textNotChecked}</span>
    </div>
  )
}

export default Check
