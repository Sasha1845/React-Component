import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { useDifficultySelector } from "../../hooks/useDifficultySelector";
import styles from "./StartPage.module.css";

function StartPage({ onStart }) {
  const { difficulty, selectDifficulty } = useDifficultySelector();

  return (
    <div className={styles.startPage}>
      <Card>
        <h1 className={styles.title}>Ханойські Башти</h1>
        <p className={styles.subtitle}>Tower of Hanoi</p>

        <div className={styles.difficultySection}>
          <h2 className={styles.sectionTitle}>Оберіть складність</h2>
          <div className={styles.difficultyButtons}>
            <Button
              onClick={() => selectDifficulty(3)}
              variant={difficulty === 3 ? "primary" : "secondary"}
            >
              Легко (3 диски)
            </Button>
            <Button
              onClick={() => selectDifficulty(4)}
              variant={difficulty === 4 ? "primary" : "secondary"}
            >
              Середньо (4 диски)
            </Button>
            <Button
              onClick={() => selectDifficulty(5)}
              variant={difficulty === 5 ? "primary" : "secondary"}
            >
              Важко (5 дисків)
            </Button>
          </div>
        </div>

        <Button
          onClick={() => onStart(difficulty)}
          variant="success"
          size="large"
        >
          Почати гру
        </Button>

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
