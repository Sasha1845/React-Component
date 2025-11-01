import { createContext, useContext, useState, useEffect } from "react";

const GameSettingsContext = createContext();

const STORAGE_KEY = "hanoi_game_settings";

const defaultSettings = {
  difficulty: 3,
  autoSave: true,
  showTimer: true,
  showMinMoves: true,
};

export const GameSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    if (settings.autoSave) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <GameSettingsContext.Provider
      value={{ settings, updateSettings, resetSettings }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};
export const useGameSettings = () => {
  const context = useContext(GameSettingsContext);
  if (!context) {
    throw new Error("useGameSettings must be used within GameSettingsProvider");
  }
  return context;
};
