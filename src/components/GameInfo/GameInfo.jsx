import styles from "./GameInfo.module.css";

function GameInfo({ moves, time, difficulty, isGameComplete = false }) {
  const minMoves = Math.pow(2, difficulty) - 1;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (!isGameComplete) {
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

  return (
    <div className={styles.resultsInfo}>
      <h1 className={styles.title}>Вітаємо!</h1>
      <p className={styles.subtitle}>Ви завершили гру</p>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Складність:</span>
          <span className={styles.statValue}>{difficulty} дисків</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statLabel}>Ваші ходи:</span>
          <span className={styles.statValue}>{moves}</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statLabel}>Мінімальні ходи:</span>
          <span className={styles.statValue}>{minMoves}</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statLabel}>Час:</span>
          <span className={styles.statValue}>
            {minutes > 0 ? `${minutes}хв ` : ""}
            {seconds}с
          </span>
        </div>
      </div>

      <div className={styles.performance}>
        {moves === minMoves ? (
          <p className={styles.perfect}>
            Ідеально! Ви зробили мінімальну кількість ходів!
          </p>
        ) : moves <= minMoves * 1.5 ? (
          <p className={styles.good}>Чудова робота!</p>
        ) : (
          <p className={styles.tryAgain}>
            Спробуйте ще раз для кращого результату!
          </p>
        )}
      </div>
    </div>
  );
}

export default GameInfo;
