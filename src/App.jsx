import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import { usePageNavigation } from "./hooks/usePageNavigation";
import styles from "./App.module.css";

function App() {
  const { currentPage, gameData, startGame, finishGame, resetGame } =
    usePageNavigation();

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
