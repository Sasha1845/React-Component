import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Tower from "../../components/Tower/Tower";
import GameInfo from "../../components/GameInfo/GameInfo";
import GameCompleteModal from "../../components/GameCompleteModal/GameCompleteModal";
import { useHanoiGame } from "../../hooks/useHanoiGame";
import { useGameTimer } from "../../hooks/useGameTimer";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { useGameSessionStore } from "../../stores/useGameSessionStore";
import { useResultsStore } from "../../stores/useResultsStore";
import styles from "./GamePage.module.css";

function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const showTimer = useSettingsStore((state) => state.showTimer);
  const showMinMoves = useSettingsStore((state) => state.showMinMoves);

  const getSession = useGameSessionStore((state) => state.getSession);
  const updateSession = useGameSessionStore((state) => state.updateSession);
  const deleteSession = useGameSessionStore((state) => state.deleteSession);
  const createSession = useGameSessionStore((state) => state.createSession);

  const addResult = useResultsStore((state) => state.addResult);

  const gameSession = getSession(gameId);
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
    if (!gameId) {
      setLoading(false);
      return;
    }

    const session = getSession(gameId);

    if (!session) {
      setError("Гру не знайдено");
      setLoading(false);
      const timer = setTimeout(() => navigate("/"), 2000);
      return () => clearTimeout(timer);
    }

    if (session.towers) {
      setTowers(session.towers);
      setMoves(session.moves || 0);
      if (session.isStarted) {
        setIsGameStarted(true);
      }
    }

    setError(null);
    setLoading(false);
  }, [gameId, getSession, navigate, setTowers, setMoves, setIsGameStarted]);

  useEffect(() => {
    if (gameId && (isGameStarted || isGameComplete)) {
      updateSession(gameId, {
        towers,
        moves,
        time,
        isCompleted: isGameComplete,
        isStarted: isGameStarted,
      });
    }
  }, [
    gameId,
    towers,
    moves,
    time,
    isGameComplete,
    isGameStarted,
    updateSession,
  ]);

  const minMoves = Math.pow(2, difficulty) - 1;

  const handleFinish = useCallback(() => {
    if (isGameComplete) {
      addResult({
        difficulty,
        moves,
        time,
        minMoves,
      });
    }
    setShowModal(true);
  }, [isGameComplete, addResult, difficulty, moves, time, minMoves]);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleRestart = useCallback(() => {
    setShowModal(false);
    setIsGameComplete(false);

    const oldSession = getSession(gameId);
    if (oldSession) {
      deleteSession(gameId);
      const newGameId = createSession(
        oldSession.difficulty,
        oldSession.settings
      );
      setTimeout(() => {
        navigate(`/game/${newGameId}`);
      }, 50);
    }
  }, [
    gameId,
    getSession,
    deleteSession,
    createSession,
    navigate,
    setIsGameComplete,
  ]);

  const handleGoHome = useCallback(() => {
    setShowModal(false);
    deleteSession(gameId);
    navigate("/");
  }, [gameId, deleteSession, navigate]);

  const handleBack = useCallback(() => {
    deleteSession(gameId);
    navigate("/");
  }, [gameId, deleteSession, navigate]);

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
            showTimer={showTimer}
            showMinMoves={showMinMoves}
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
