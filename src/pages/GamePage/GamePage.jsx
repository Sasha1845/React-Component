import { useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Tower from "../../components/Tower/Tower";
import GameInfo from "../../components/GameInfo/GameInfo";
import GameCompleteModal from "../../components/GameCompleteModal/GameCompleteModal";
import { useHanoiGame } from "../../hooks/useHanoiGame";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useGameSettings } from "../../contexts/GameSettingsContext";
import styles from "./GamePage.module.css";

function GamePage({ difficulty, onBack }) {
  const {
    towers,
    selectedDisk,
    moves,
    isGameStarted,
    isGameComplete,
    handleTowerClick,
    resetGame,
  } = useHanoiGame(difficulty);

  const { time } = useGameTimer(isGameStarted && !isGameComplete);
  const { settings } = useGameSettings();
  const [showModal, setShowModal] = useState(false);

  const minMoves = Math.pow(2, difficulty) - 1;

  const handleFinish = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRestart = () => {
    setShowModal(false);
    resetGame();
  };

  const handleGoHome = () => {
    setShowModal(false);
    onBack();
  };

  return (
    <div className={styles.gamePage}>
      <Card>
        <div
          className={`${styles.gameContent} ${
            showModal ? styles.modalOpen : ""
          }`}
        >
          <div className={styles.header}>
            <Button onClick={onBack} variant="secondary" size="small">
              ← Назад
            </Button>
            <h1 className={styles.title}>Гра</h1>
            <Button onClick={handleFinish} variant="success" size="small">
              Завершити
            </Button>
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

          {isGameComplete && (
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
