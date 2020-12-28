import React from "react"
// @ts-ignore
import styles from "../styles/loader.module"

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner}></div>
    </div>
  )
}

export default Loader
