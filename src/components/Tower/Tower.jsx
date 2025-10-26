import Disk from "../Disk/Disk";
import styles from "./Tower.module.css";

function Tower({ id, disks, onTowerClick, selectedDisk, towerIndex }) {
  const isTopDiskSelected =
    selectedDisk && selectedDisk.fromTower === towerIndex && disks.length > 0;

  const reversedDisks = [...disks].reverse();

  return (
    <div className={styles.towerContainer} onClick={onTowerClick}>
      <div className={styles.tower}>
        <div className={styles.rod}></div>
        <div className={styles.disksContainer}>
          {reversedDisks.map((diskSize, index) => (
            <Disk
              key={index}
              size={diskSize}
              isSelected={
                isTopDiskSelected && index === reversedDisks.length - 1
              }
            />
          ))}
        </div>
      </div>
      <div className={styles.base}></div>
      <div className={styles.label}>Стрижень {id}</div>
    </div>
  );
}

export default Tower;
