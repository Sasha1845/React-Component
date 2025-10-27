import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Tower from "../../components/Tower/Tower";
import GameInfo from "../../components/GameInfo/GameInfo";
import { useHanoiGame } from "../../hooks/useHanoiGame";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useState } from "react";
import styles from "./GamePage.module.css";

function GamePage({ difficulty, onBack }) {
  const {
    towers,
    selectedDisk,
    moves,
    isGameStarted,
    isGameComplete,
    handleTowerClick,
  } = useHanoiGame(difficulty);

  const { time } = useGameTimer(isGameStarted);
  const [showResults, setShowResults] = useState(false);

  const handleFinish = () => {
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowResults(false);
    onBack();
  };

  return (
    <div className={styles.gamePage}>
      <Card>
        {!showResults ? (
          <>
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
              isGameComplete={false}
            />

            <div className={styles.gameArea}>
              <div className={styles.towers}>
                {towers.map((disks, index) => (
                  <Tower
                    key={index}
                    id={index + 1}
                    disks={disks}
                    onTowerClick={() => handleTowerClick(index)}
                    selectedDisk={selectedDisk}
                    towerIndex={index}
                  />
                ))}
              </div>
            </div>

            <div className={styles.hint}>
              <p>
                Клацніть на диск, щоб його вибрати, потім клацніть на стрижень
                для переміщення
              </p>
            </div>

            {isGameComplete && (
              <div className={styles.completeMessage}>
                <p>Вітаємо! Ви завершили гру!</p>
                <p className={styles.completeHint}>
                  Натисніть "Завершити" щоб переглянути результати
                </p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.resultsContainer}>
            <GameInfo
              moves={moves}
              time={time}
              difficulty={difficulty}
              isGameComplete={true}
            />

            <div className={styles.buttons}>
              <Button onClick={handleRestart} variant="primary" size="large">
                Грати знову
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default GamePage;
