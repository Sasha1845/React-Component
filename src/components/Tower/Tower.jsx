import Disk from "../Disk/Disk";
import styles from "./Tower.module.css";

function Tower({ id, disks }) {
  return (
    <div className={styles.towerContainer}>
      <div className={styles.tower}>
        <div className={styles.rod}></div>
        <div className={styles.disksContainer}>
          {disks.map((diskSize, index) => (
            <Disk key={index} size={diskSize} />
          ))}
        </div>
      </div>
      <div className={styles.base}></div>
      <div className={styles.label}>Стрижень {id}</div>
    </div>
  );
}

export default Tower;
