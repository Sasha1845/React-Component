import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGameSession,
  updateGameSession,
  createGameSession,
  deleteGameSession,
  completeGameSession,
} from "../utils/gameSession";

export const useGameSession = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameSession, setGameSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) {
      setLoading(false);
      return;
    }

    const session = getGameSession(gameId);

    if (!session) {
      setError("Гру не знайдено");
      setLoading(false);
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    setGameSession(session);
    setError(null);
    setLoading(false);
  }, [gameId, navigate]);

  const startNewGame = (difficulty, settings) => {
    const newGameId = createGameSession(difficulty, settings);
    navigate(`/game/${newGameId}`);
    return newGameId;
  };

  const updateSession = (updates) => {
    if (!gameId) return;

    updateGameSession(gameId, updates);
    const updatedSession = getGameSession(gameId);
    setGameSession(updatedSession);
  };

  const finishGame = (finalStats) => {
    if (!gameId) return;

    completeGameSession(gameId, finalStats);
    const updatedSession = getGameSession(gameId);
    setGameSession(updatedSession);
  };

  const deleteCurrentGame = () => {
    if (!gameId) return;

    deleteGameSession(gameId);
    navigate("/");
  };

  const restartGame = () => {
    if (!gameSession) return;

    const { difficulty, settings } = gameSession;
    deleteGameSession(gameId);
    startNewGame(difficulty, settings);
  };

  return {
    gameId,
    gameSession,
    loading,
    error,
    startNewGame,
    updateSession,
    finishGame,
    deleteCurrentGame,
    restartGame,
  };
};
