import { Routes, Route, Navigate } from "react-router-dom";
import StartPage from "../pages/StartPage/StartPage";
import GamePage from "../pages/GamePage/GamePage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game/:gameId" element={<GamePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
