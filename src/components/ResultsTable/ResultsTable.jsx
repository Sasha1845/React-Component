import { useState } from "react";
import { useResultsStore } from "../../stores/useResultsStore";
import styles from "./ResultsTable.module.css";

function ResultsTable({ results }) {
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const deleteResult = useResultsStore((state) => state.deleteResult);

  const filteredResults = results.filter(
    (result) =>
      filterDifficulty === "all" ||
      result.difficulty === parseInt(filterDifficulty)
  );

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.timestamp) - new Date(a.timestamp);
      case "moves":
        return a.moves - b.moves;
      case "time":
        return a.time - b.time;
      case "difficulty":
        return b.difficulty - a.difficulty;
      default:
        return 0;
    }
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes > 0 ? `${minutes}хв ${secs}с` : `${secs}с`;
  };

  const getPerformanceBadge = (moves, minMoves) => {
    if (moves === minMoves) {
      return (
        <span className={`${styles.badge} ${styles.perfect}`}>⭐ Ідеально</span>
      );
    }
    if (moves <= minMoves * 1.5) {
      return <span className={`${styles.badge} ${styles.good}`}>✨ Добре</span>;
    }
    return (
      <span className={`${styles.badge} ${styles.normal}`}>💪 Спробуй ще</span>
    );
  };

  const getDifficultyLabel = (difficulty) => {
    const labels = {
      3: "🟢 Легко",
      4: "🟡 Середньо",
      5: "🟠 Важко",
      6: "🔴 Дуже важко",
      7: "⚫ Експерт",
    };
    return labels[difficulty] || difficulty;
  };

  return (
    <div className={styles.resultsTable}>
      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <label>Фільтр:</label>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className={styles.select}
          >
            <option value="all">Всі рівні</option>
            <option value="3">🟢 Легко (3)</option>
            <option value="4">🟡 Середньо (4)</option>
            <option value="5">🟠 Важко (5)</option>
            <option value="6">🔴 Дуже важко (6)</option>
            <option value="7">⚫ Експерт (7)</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Сортування:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="date">За датою</option>
            <option value="moves">За ходами</option>
            <option value="time">За часом</option>
            <option value="difficulty">За складністю</option>
          </select>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Складність</th>
              <th>Ходи</th>
              <th>Мінімум</th>
              <th>Час</th>
              <th>Оцінка</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result) => (
              <tr key={result.id}>
                <td>{formatDate(result.timestamp)}</td>
                <td>{getDifficultyLabel(result.difficulty)}</td>
                <td className={styles.highlight}>{result.moves}</td>
                <td>{result.minMoves}</td>
                <td>{formatTime(result.time)}</td>
                <td>{getPerformanceBadge(result.moves, result.minMoves)}</td>
                <td>
                  <button
                    onClick={() => deleteResult(result.id)}
                    className={styles.deleteBtn}
                    title="Видалити"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <p>
          Показано результатів: {sortedResults.length} з {results.length}
        </p>
      </div>
    </div>
  );
}

export default ResultsTable;
