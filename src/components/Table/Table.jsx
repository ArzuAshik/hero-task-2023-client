import React from 'react'
import Row from './Row'
import styles from "./style.module.css"

export default function Table({data=[]}) {
  return (
    <table border={1} className={styles.table}>
        <thead>
            <tr>
                <th className={styles.cell}>Billing ID</th>
                <th className={styles.cell}>Full Name</th>
                <th className={styles.cell}>Email</th>
                <th className={styles.cell}>Phone</th>
                <th className={styles.cell}>Paid Amount</th>
                <th className={styles.cell} colSpan={2}>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => <Row item={item} />)}
        </tbody>
    </table>
  )
}
