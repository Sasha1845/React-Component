import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
import { useGameSessionStore } from "../../stores/useGameSessionStore";
import styles from "./StartPage.module.css";

function StartPage() {
  const navigate = useNavigate();
  const createSession = useGameSessionStore((state) => state.createSession);

  const handleStart = (difficulty) => {
    const gameId = createSession(difficulty, {});
    navigate(`/game/${gameId}`);
  };

  const handleGoToSettings = () => {
    navigate("/settings");
  };

  const handleGoToResults = () => {
    navigate("/results");
  };

  return (
    <div className={styles.startPage}>
      <Card>
        <h1 className={styles.title}>Ханойські Башти</h1>
        <p className={styles.subtitle}>Tower of Hanoi</p>

        <SettingsForm onSubmit={handleStart} />

        <div className={styles.navigation}>
          <Button onClick={handleGoToSettings} variant="secondary" size="large">
            ⚙️ Налаштування
          </Button>
          <Button onClick={handleGoToResults} variant="secondary" size="large">
            📊 Таблиця результатів
          </Button>
        </div>

        <div className={styles.rules}>
          <h3>Правила гри:</h3>
          <ul>
            <li>Перемістіть усі диски з першого стрижня на третій</li>
            <li>За один хід можна перемістити лише один диск</li>
            <li>Більший диск не може лежати на меншому</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default StartPage;
