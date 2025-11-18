import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Tower from "../../components/Tower/Tower";
import GameInfo from "../../components/GameInfo/GameInfo";
import GameCompleteModal from "../../components/GameCompleteModal/GameCompleteModal";
import { useHanoiGame } from "../../hooks/useHanoiGame";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useGameSettings } from "../../contexts/GameSettingsContext";
import { useGameSession } from "../../hooks/useGameSession";
import styles from "./GamePage.module.css";

function GamePage() {
  const { settings } = useGameSettings();
  const {
    gameId,
    gameSession,
    loading,
    error,
    updateSession,
    finishGame,
    deleteCurrentGame,
    restartGame,
  } = useGameSession();

  const [showModal, setShowModal] = useState(false);
  const difficulty = gameSession?.difficulty || 3;

  const {
    towers,
    selectedDisk,
    moves,
    isGameStarted,
    isGameComplete,
    handleTowerClick,
    setTowers,
    setMoves,
    setIsGameStarted,
    setIsGameComplete,
  } = useHanoiGame(difficulty);

  const { time } = useGameTimer(
    isGameStarted && !isGameComplete,
    gameSession?.time || 0
  );

  useEffect(() => {
    if (gameSession && gameSession.towers) {
      setTowers(gameSession.towers);
      setMoves(gameSession.moves || 0);
      if (gameSession.isStarted) {
        setIsGameStarted(true);
      }
    }
  }, [gameSession?.id]);

  useEffect(() => {
    if (gameId && (isGameStarted || isGameComplete)) {
      updateSession({
        towers,
        moves,
        time,
        isCompleted: isGameComplete,
        isStarted: isGameStarted,
      });
    }
  }, [towers, moves, isGameComplete, isGameStarted]);

  const minMoves = Math.pow(2, difficulty) - 1;

  const handleFinish = () => {
    if (isGameComplete) {
      finishGame({
        moves,
        time,
        difficulty,
        minMoves,
      });
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRestart = () => {
    setShowModal(false);
    setIsGameComplete(false);
    setTimeout(() => {
      restartGame();
    }, 50);
  };

  const handleGoHome = () => {
    setShowModal(false);
    deleteCurrentGame();
  };

  const handleBack = () => {
    deleteCurrentGame();
  };

  if (loading) {
    return (
      <div className={styles.gamePage}>
        <Card>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Завантаження гри...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.gamePage}>
        <Card>
          <div className={styles.error}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2>Помилка</h2>
            <p>{error}</p>
            <p className={styles.errorHint}>
              Перенаправлення на головну сторінку...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.gamePage}>
      <Card>
        <div
          className={`${styles.gameContent} ${
            showModal ? styles.modalOpen : ""
          }`}
        >
          <div className={styles.header}>
            <Button onClick={handleBack} variant="secondary" size="small">
              ← Назад
            </Button>
            <h1 className={styles.title}>Гра</h1>
            <Button onClick={handleFinish} variant="success" size="small">
              Завершити
            </Button>
          </div>

          <div className={styles.gameIdBadge}>
            <span className={styles.gameIdLabel}>ID гри:</span>
            <span className={styles.gameIdValue}>{gameId?.slice(0, 8)}...</span>
          </div>

          <GameInfo
            moves={moves}
            time={time}
            difficulty={difficulty}
            showTimer={settings.showTimer}
            showMinMoves={settings.showMinMoves}
          />

          <div className={styles.gameArea}>
            <div className={styles.towers}>
              {towers.map((disks, index) => (
                <Tower
                  key={index}
                  id={index + 1}
                  disks={disks}
                  onTowerClick={() => !showModal && handleTowerClick(index)}
                  selectedDisk={selectedDisk}
                  towerIndex={index}
                  maxDisks={difficulty}
                />
              ))}
            </div>
          </div>

          <div className={styles.hint}>
            <p>
              Клацніть на диск, щоб його вибрати, потім клацніть на стрижень для
              переміщення
            </p>
          </div>

          {isGameComplete && !showModal && (
            <div className={styles.completeMessage}>
              <div className={styles.completeIcon}>🎉</div>
              <p className={styles.completeTitle}>Вітаємо! Ви завершили гру!</p>
              <p className={styles.completeHint}>
                Натисніть "Завершити" щоб переглянути детальні результати
              </p>
            </div>
          )}
        </div>
      </Card>

      <GameCompleteModal
        isOpen={showModal}
        onClose={handleModalClose}
        onRestart={handleRestart}
        onGoHome={handleGoHome}
        gameStats={{
          moves,
          time,
          difficulty,
          minMoves,
          isGameComplete,
        }}
      />
    </div>
  );
}

export default GamePage;
