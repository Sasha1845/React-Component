import { useState, useEffect } from "react";

export const useHanoiGame = (difficulty) => {
  const [towers, setTowers] = useState([[], [], []]);
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [moves, setMoves] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    const firstTower = Array.from({ length: difficulty }, (_, i) => i + 1);
    setTowers([firstTower, [], []]);
    setSelectedDisk(null);
    setMoves(0);
    setIsGameStarted(false);
    setIsGameComplete(false);
  };

  const handleDiskClick = (towerIndex) => {
    if (isGameComplete) return;

    if (!isGameStarted) {
      setIsGameStarted(true);
    }

    if (towers[towerIndex].length === 0) return;

    const topDisk = towers[towerIndex][0];

    if (selectedDisk === null) {
      setSelectedDisk({ disk: topDisk, fromTower: towerIndex });
    } else {
      if (selectedDisk.fromTower === towerIndex) {
        setSelectedDisk(null);
      }
    }
  };

  const handleTowerClick = (towerIndex) => {
    if (isGameComplete) return;

    if (selectedDisk === null) {
      handleDiskClick(towerIndex);
      return;
    }

    const targetTower = towers[towerIndex];
    const canMove =
      targetTower.length === 0 || selectedDisk.disk < targetTower[0];

    if (canMove) {
      const newTowers = towers.map((tower, index) => {
        if (index === selectedDisk.fromTower) {
          return tower.slice(1);
        }
        if (index === towerIndex) {
          return [selectedDisk.disk, ...tower];
        }
        return tower;
      });

      setTowers(newTowers);
      setMoves((prevMoves) => prevMoves + 1);
      setSelectedDisk(null);

      if (newTowers[2].length === difficulty) {
        setIsGameComplete(true);
      }
    } else {
      setSelectedDisk(null);
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  return {
    towers,
    selectedDisk,
    moves,
    isGameStarted,
    isGameComplete,
    handleTowerClick,
    resetGame,
  };
};
