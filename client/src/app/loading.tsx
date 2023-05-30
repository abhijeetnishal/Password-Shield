import styles from "../styles/loading.module.css"

export default function LoadingSpinner() {
  return (
    <div className={styles.loader}>
      <div className={styles.scanner}>
        <span>Loading...</span>
      </div>
    </div>
  );
}