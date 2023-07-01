import styles from "../styles/home.module.css"

export default function Home() {
  return (
    <div className={styles.flex}>
    <div className={styles.container}>
      <h1 className={styles.my} >MY</h1>
      <h1 className={styles.cat}>cat</h1>
      <h1 className={styles.id}>ID</h1>
      <p className={styles.description}>The app for your cat data online</p>
    </div>
    </div>
  );
}

