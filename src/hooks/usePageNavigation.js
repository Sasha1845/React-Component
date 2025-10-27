import { useState } from "react";

export const usePageNavigation = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [gameData, setGameData] = useState({
    difficulty: 3,
  });

  const startGame = (difficulty) => {
    setGameData({
      difficulty: difficulty,
    });
    setCurrentPage("game");
  };

  const resetGame = () => {
    setCurrentPage("start");
  };

  return {
    currentPage,
    gameData,
    startGame,
    resetGame,
  };
};
