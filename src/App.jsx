import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import { usePageNavigation } from "./hooks/usePageNavigation";
import { GameSettingsProvider } from "./contexts/GameSettingsContext";
import styles from "./App.module.css";

function App() {
  const { currentPage, gameData, startGame, resetGame } = usePageNavigation();

  return (
    <GameSettingsProvider>
      <div className={styles.app}>
        {currentPage === "start" && <StartPage onStart={startGame} />}
        {currentPage === "game" && (
          <GamePage
            difficulty={gameData.difficulty}
            onFinish={resetGame}
            onBack={resetGame}
          />
        )}
      </div>
    </GameSettingsProvider>
  );
}

export default App;
