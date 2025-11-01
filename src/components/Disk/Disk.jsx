import styles from "./Disk.module.css";

function Disk({ size, isSelected = false }) {
  const width = 40 + size * 20;
  const colors = [
    "#fc8181",
    "#f6ad55",
    "#f6e05e",
    "#68d391",
    "#4fd1c5",
    "#4299e1",
    "#9f7aea",
  ];

  const color = colors[size - 1] || "#cbd5e0";

  return (
    <div
      className={`${styles.disk} ${isSelected ? styles.selected : ""}`}
      style={{
        width: `${width}px`,
        backgroundColor: color,
      }}
    >
      {size}
    </div>
  );
}

export default Disk;
