import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useResultsStore = create(
  persist(
    (set, get) => ({
      results: [],

      addResult: (result) =>
        set((state) => ({
          results: [
            {
              id: Date.now(),
              timestamp: new Date().toISOString(),
              ...result,
            },
            ...state.results,
          ],
        })),

      deleteResult: (id) =>
        set((state) => ({
          results: state.results.filter((r) => r.id !== id),
        })),

      clearResults: () => set({ results: [] }),

      getResultsByDifficulty: (difficulty) => {
        return get().results.filter((r) => r.difficulty === difficulty);
      },

      getBestResult: (difficulty) => {
        const results = get().getResultsByDifficulty(difficulty);
        if (results.length === 0) return null;

        return results.reduce((best, current) => {
          if (current.moves < best.moves) return current;
          if (current.moves === best.moves && current.time < best.time)
            return current;
          return best;
        });
      },

      getStatistics: () => {
        const results = get().results;
        if (results.length === 0) {
          return {
            totalGames: 0,
            perfectGames: 0,
            averageMoves: 0,
            averageTime: 0,
            byDifficulty: {},
          };
        }

        const perfectGames = results.filter(
          (r) => r.moves === r.minMoves
        ).length;
        const totalMoves = results.reduce((sum, r) => sum + r.moves, 0);
        const totalTime = results.reduce((sum, r) => sum + r.time, 0);

        const byDifficulty = {};
        [3, 4, 5, 6, 7].forEach((difficulty) => {
          const diffResults = results.filter(
            (r) => r.difficulty === difficulty
          );
          byDifficulty[difficulty] = {
            count: diffResults.length,
            bestMoves:
              diffResults.length > 0
                ? Math.min(...diffResults.map((r) => r.moves))
                : null,
            bestTime:
              diffResults.length > 0
                ? Math.min(...diffResults.map((r) => r.time))
                : null,
          };
        });

        return {
          totalGames: results.length,
          perfectGames,
          averageMoves: Math.round(totalMoves / results.length),
          averageTime: Math.round(totalTime / results.length),
          byDifficulty,
        };
      },
    }),
    {
      name: "hanoi_game_results",
    }
  )
);
