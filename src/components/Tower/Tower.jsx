import Disk from "../Disk/Disk";
import styles from "./Tower.module.css";

function Tower({
  id,
  disks,
  onTowerClick,
  selectedDisk,
  towerIndex,
  maxDisks,
}) {
  const isTopDiskSelected =
    selectedDisk && selectedDisk.fromTower === towerIndex && disks.length > 0;

  const reversedDisks = [...disks].reverse();
  const towerHeight = 250 + Math.max(0, maxDisks - 3) * 20;
  const rodHeight = towerHeight - 50;

  return (
    <div className={styles.towerContainer} onClick={onTowerClick}>
      <div className={styles.tower} style={{ height: `${towerHeight}px` }}>
        <div className={styles.rod} style={{ height: `${rodHeight}px` }}></div>
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
