import { useState } from "react";

export const usePageNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameData, setGameData] = useState({
    difficulty: 3,
    moves: 0,
    time: 0,
  });

  const startGame = (difficulty) => {
    setGameData({
      difficulty: difficulty,
      moves: 0,
      time: 0,
    });
    setCurrentPage("game");
  };

  const finishGame = (moves, time) => {
    setGameData({
      ...gameData,
      moves: moves,
      time: time,
    });
    setCurrentPage("results");
  };

  const resetGame = () => {
    setCurrentPage("start");
  };

  return {
    currentPage,
    gameData,
    startGame,
    finishGame,
    resetGame,
  };
};
