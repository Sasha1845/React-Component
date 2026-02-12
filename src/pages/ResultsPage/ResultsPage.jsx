import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import ResultsTable from "../../components/ResultsTable/ResultsTable";
import { useResultsStore } from "../../stores/useResultsStore";
import styles from "./ResultsPage.module.css";

function ResultsPage() {
  const navigate = useNavigate();
  const { results, clearResults, getStatistics } = useResultsStore();
  const stats = getStatistics();

  const handleBack = () => {
    navigate("/");
  };

  const handleClear = () => {
    if (window.confirm("Ви впевнені, що хочете видалити всі результати?")) {
      clearResults();
    }
  };

  return (
    <div className={styles.resultsPage}>
      <Card>
        <div className={styles.header}>
          <Button onClick={handleBack} variant="secondary" size="small">
            ← Назад
          </Button>
          <h1 className={styles.title}>Таблиця результатів</h1>
          <Button
            onClick={handleClear}
            variant="secondary"
            size="small"
            disabled={results.length === 0}
          >
            🗑️ Очистити
          </Button>
        </div>

        {results.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🎮</div>
            <h2>Немає результатів</h2>
            <p>Пройдіть гру, щоб побачити свої результати тут</p>
            <Button onClick={() => navigate("/")} variant="success">
              Почати гру
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.statistics}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.totalGames}</div>
                <div className={styles.statLabel}>Всього ігор</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.perfectGames}</div>
                <div className={styles.statLabel}>Ідеальних ігор</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.averageMoves}</div>
                <div className={styles.statLabel}>Середні ходи</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>{stats.averageTime}с</div>
                <div className={styles.statLabel}>Середній час</div>
              </div>
            </div>

            <ResultsTable results={results} />
          </>
        )}
      </Card>
    </div>
  );
}

export default ResultsPage;
