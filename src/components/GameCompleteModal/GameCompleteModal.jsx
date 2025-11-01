import Portal from "../Portal/Portal";
import Button from "../Button/Button";
import styles from "./GameCompleteModal.module.css";

function GameCompleteModal({
  isOpen,
  onClose,
  onRestart,
  onGoHome,
  gameStats,
}) {
  if (!isOpen) return null;

  const { moves, time, difficulty, minMoves, isGameComplete } = gameStats;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const isPerfect = moves === minMoves;
  const isGood = moves <= minMoves * 1.5;

  return (
    <Portal containerId="modal-root">
      <div className={styles.overlay}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {isGameComplete ? "🎉 Вітаємо!" : "📊 Статистика гри"}
            </h2>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>

          {isGameComplete ? (
            <p className={styles.subtitle}>Ви завершили гру!</p>
          ) : (
            <p className={styles.subtitle}>Поточний прогрес</p>
          )}

          <div className={styles.stats}>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Складність:</span>
              <span className={styles.statValue}>{difficulty} дисків</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Ваші ходи:</span>
              <span className={styles.statValue}>{moves}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Мінімум:</span>
              <span className={styles.statValue}>{minMoves}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Час:</span>
              <span className={styles.statValue}>
                {minutes > 0 ? `${minutes}хв ` : ""}
                {seconds}с
              </span>
            </div>
          </div>

          {isGameComplete && (
            <div className={styles.performance}>
              {isPerfect ? (
                <p className={styles.perfect}>
                  ⭐ Ідеально! Мінімальна кількість ходів!
                </p>
              ) : isGood ? (
                <p className={styles.good}>✨ Чудова робота!</p>
              ) : (
                <p className={styles.tryAgain}>
                  💪 Спробуйте ще для кращого результату!
                </p>
              )}
            </div>
          )}

          <div className={styles.actions}>
            <Button onClick={onGoHome} variant="secondary" size="medium">
              🏠 На головну
            </Button>
            <Button onClick={onRestart} variant="success" size="medium">
              🔄 Грати знову
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default GameCompleteModal;
