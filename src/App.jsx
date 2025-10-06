import { useState } from "react";
import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import styles from "./App.module.css";

function App() {
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

  return (
    <div className={styles.app}>
      {currentPage === "start" && <StartPage onStart={startGame} />}
      {currentPage === "game" && (
        <GamePage
          difficulty={gameData.difficulty}
          onFinish={finishGame}
          onBack={resetGame}
        />
      )}
      {currentPage === "results" && (
        <ResultsPage
          moves={gameData.moves}
          time={gameData.time}
          difficulty={gameData.difficulty}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}

export default App;
