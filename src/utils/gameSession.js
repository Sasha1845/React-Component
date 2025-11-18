import { generateGameId } from "./generateGameId";
const GAME_SESSION_KEY = "hanoi_game_sessions";
const CURRENT_GAME_KEY = "hanoi_current_game_id";

export const getAllGameSessions = () => {
  try {
    const sessions = sessionStorage.getItem(GAME_SESSION_KEY);
    return sessions ? JSON.parse(sessions) : {};
  } catch (error) {
    console.error("Error getting game sessions:", error);
    return {};
  }
};

export const createGameSession = (difficulty, settings = {}) => {
  const gameId = generateGameId();
  const sessions = getAllGameSessions();

  sessions[gameId] = {
    id: gameId,
    difficulty,
    settings,
    startTime: new Date().toISOString(),
    moves: 0,
    time: 0,
    isCompleted: false,
    towers: [Array.from({ length: difficulty }, (_, i) => i + 1), [], []],
  };

  sessionStorage.setItem(GAME_SESSION_KEY, JSON.stringify(sessions));
  sessionStorage.setItem(CURRENT_GAME_KEY, gameId);

  return gameId;
};

export const getGameSession = (gameId) => {
  const sessions = getAllGameSessions();
  return sessions[gameId] || null;
};
export const updateGameSession = (gameId, updates) => {
  const sessions = getAllGameSessions();
  if (sessions[gameId]) {
    sessions[gameId] = {
      ...sessions[gameId],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    sessionStorage.setItem(GAME_SESSION_KEY, JSON.stringify(sessions));
  }
};
export const deleteGameSession = (gameId) => {
  const sessions = getAllGameSessions();
  delete sessions[gameId];
  sessionStorage.setItem(GAME_SESSION_KEY, JSON.stringify(sessions));
  const currentGameId = sessionStorage.getItem(CURRENT_GAME_KEY);
  if (currentGameId === gameId) {
    sessionStorage.removeItem(CURRENT_GAME_KEY);
  }
};
export const getCurrentGameId = () => {
  return sessionStorage.getItem(CURRENT_GAME_KEY);
};

export const setCurrentGameId = (gameId) => {
  sessionStorage.setItem(CURRENT_GAME_KEY, gameId);
};

export const clearAllGameSessions = () => {
  sessionStorage.removeItem(GAME_SESSION_KEY);
  sessionStorage.removeItem(CURRENT_GAME_KEY);
};

export const completeGameSession = (gameId, finalStats) => {
  updateGameSession(gameId, {
    isCompleted: true,
    completedTime: new Date().toISOString(),
    finalStats,
  });
};
