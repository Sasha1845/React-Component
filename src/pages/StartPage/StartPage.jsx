import Card from "../../components/Card/Card";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
import { useGameSession } from "../../hooks/useGameSession";
import styles from "./StartPage.module.css";

function StartPage() {
  const { startNewGame } = useGameSession();

  const handleStart = (difficulty) => {
    startNewGame(difficulty);
  };

  return (
    <div className={styles.startPage}>
      <Card>
        <h1 className={styles.title}>Ханойські Башти</h1>
        <p className={styles.subtitle}>Tower of Hanoi</p>

        <SettingsForm onSubmit={handleStart} />

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
