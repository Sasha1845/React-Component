import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { GameSettingsProvider } from "./contexts/GameSettingsContext";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <GameSettingsProvider>
        <div className={styles.app}>
          <AppRoutes />
        </div>
      </GameSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
