import React from "react"
// @ts-ignore
import styles from "../styles/loader.module"

interface ILoaderDataProps {
  load: boolean
}

const LoaderData: React.FC<ILoaderDataProps> = ({ load }) => {
  return (
    <div
      className={`${styles.loader_data} ${load && styles.loader_data__active}`}
    >
      <div className={styles.loader_data__spinner}></div>
    </div>
  )
}

export default LoaderData
