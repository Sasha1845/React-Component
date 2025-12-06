import { create } from "zustand";
import { persist } from "zustand/middleware";

const generateGameId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useGameSessionStore = create(
  persist(
    (set, get) => ({
      sessions: {},
      currentGameId: null,

      createSession: (difficulty, settings = {}) => {
        const gameId = generateGameId();
        const newSession = {
          id: gameId,
          difficulty,
          settings,
          startTime: new Date().toISOString(),
          moves: 0,
          time: 0,
          isCompleted: false,
          isStarted: false,
          towers: [Array.from({ length: difficulty }, (_, i) => i + 1), [], []],
        };

        set((state) => ({
          sessions: { ...state.sessions, [gameId]: newSession },
          currentGameId: gameId,
        }));

        return gameId;
      },

      getSession: (gameId) => {
        return get().sessions[gameId] || null;
      },

      getCurrentSession: () => {
        const currentGameId = get().currentGameId;
        return currentGameId ? get().sessions[currentGameId] : null;
      },

      updateSession: (gameId, updates) => {
        set((state) => ({
          sessions: {
            ...state.sessions,
            [gameId]: {
              ...state.sessions[gameId],
              ...updates,
              lastUpdated: new Date().toISOString(),
            },
          },
        }));
      },

      deleteSession: (gameId) => {
        set((state) => {
          const newSessions = { ...state.sessions };
          delete newSessions[gameId];

          return {
            sessions: newSessions,
            currentGameId:
              state.currentGameId === gameId ? null : state.currentGameId,
          };
        });
      },

      setCurrentGameId: (gameId) => set({ currentGameId: gameId }),

      completeSession: (gameId, finalStats) => {
        set((state) => ({
          sessions: {
            ...state.sessions,
            [gameId]: {
              ...state.sessions[gameId],
              isCompleted: true,
              completedTime: new Date().toISOString(),
              finalStats,
            },
          },
        }));
      },

      clearAllSessions: () => set({ sessions: {}, currentGameId: null }),
    }),
    {
      name: "hanoi_game_sessions",
      getStorage: () => sessionStorage,
    }
  )
);
