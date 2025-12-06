import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettingsStore = create(
  persist(
    (set) => ({
      difficulty: 3,
      autoSave: true,
      showTimer: true,
      showMinMoves: true,

      setDifficulty: (difficulty) => set({ difficulty }),
      setAutoSave: (autoSave) => set({ autoSave }),
      setShowTimer: (showTimer) => set({ showTimer }),
      setShowMinMoves: (showMinMoves) => set({ showMinMoves }),

      updateSettings: (settings) => set((state) => ({ ...state, ...settings })),

      resetSettings: () =>
        set({
          difficulty: 3,
          autoSave: true,
          showTimer: true,
          showMinMoves: true,
        }),
    }),
    {
      name: "hanoi_game_settings",
    }
  )
);
