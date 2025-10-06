import styles from "./GameInfo.module.css";

function GameInfo({ moves, time, difficulty }) {
  const minMoves = Math.pow(2, difficulty) - 1;

  return (
    <div className={styles.gameInfo}>
      <div className={styles.infoItem}>
        <span className={styles.label}>Ходи:</span>
        <span className={styles.value}>{moves}</span>
      </div>

      <div className={styles.infoItem}>
        <span className={styles.label}>Час:</span>
        <span className={styles.value}>{time}с</span>
      </div>

      <div className={styles.infoItem}>
        <span className={styles.label}>Мінімум:</span>
        <span className={styles.value}>{minMoves}</span>
      </div>
    </div>
  );
}

export default GameInfo;
