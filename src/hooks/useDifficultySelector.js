import { useState } from "react";

export const useDifficultySelector = (initialDifficulty = 3) => {
  const [difficulty, setDifficulty] = useState(initialDifficulty);

  const selectDifficulty = (level) => {
    setDifficulty(level);
  };

  return {
    difficulty,
    selectDifficulty,
  };
};
