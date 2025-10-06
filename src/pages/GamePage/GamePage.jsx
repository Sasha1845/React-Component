import { useState } from "react";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Tower from "../../components/Tower/Tower";
import GameInfo from "../../components/GameInfo/GameInfo";
import styles from "./GamePage.module.css";

function GamePage({ difficulty, onFinish, onBack }) {
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  const handleFinishDemo = () => {
    onFinish(moves, time);
  };

  return (
    <div className={styles.gamePage}>
      <Card>
        <div className={styles.header}>
          <Button onClick={onBack} variant="secondary" size="small">
            ← Назад
          </Button>
          <h1 className={styles.title}>Гра</h1>
          <Button onClick={handleFinishDemo} variant="success" size="small">
            Завершити
          </Button>
        </div>

        <GameInfo moves={moves} time={time} difficulty={difficulty} />

        <div className={styles.gameArea}>
          <div className={styles.towers}>
            <Tower id={1} disks={[]} />
            <Tower id={2} disks={[]} />
            <Tower id={3} disks={[]} />
          </div>
        </div>

        <div className={styles.hint}>
          <p>
            Клацніть на диск, щоб його вибрати, потім клацніть на стрижень для
            переміщення
          </p>
        </div>
      </Card>
    </div>
  );
}

export default GamePage;
