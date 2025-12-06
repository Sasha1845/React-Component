import { useSettingsStore } from "../../stores/useSettingsStore";
import styles from "./SettingsPanel.module.css";

function SettingsPanel() {
  const settings = useSettingsStore();

  const difficultyOptions = [
    { value: 3, label: "🟢 Легко", desc: "3 диски" },
    { value: 4, label: "🟡 Середньо", desc: "4 диски" },
    { value: 5, label: "🟠 Важко", desc: "5 дисків" },
    { value: 6, label: "🔴 Дуже важко", desc: "6 дисків" },
    { value: 7, label: "⚫ Експерт", desc: "7 дисків" },
  ];

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Складність гри</h2>
        <div className={styles.difficultyGrid}>
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.difficultyCard} ${
                settings.difficulty === option.value ? styles.active : ""
              }`}
              onClick={() => settings.setDifficulty(option.value)}
            >
              <div className={styles.difficultyLabel}>{option.label}</div>
              <div className={styles.difficultyDesc}>{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Параметри відображення</h2>
        <div className={styles.checkboxList}>
          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => settings.setAutoSave(e.target.checked)}
            />
            <div className={styles.checkboxContent}>
              <span className={styles.checkboxLabel}>Автозбереження</span>
              <span className={styles.checkboxDesc}>
                Автоматично зберігати налаштування
              </span>
            </div>
          </label>

          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={settings.showTimer}
              onChange={(e) => settings.setShowTimer(e.target.checked)}
            />
            <div className={styles.checkboxContent}>
              <span className={styles.checkboxLabel}>Показувати таймер</span>
              <span className={styles.checkboxDesc}>
                Відображати час гри під час проходження
              </span>
            </div>
          </label>

          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={settings.showMinMoves}
              onChange={(e) => settings.setShowMinMoves(e.target.checked)}
            />
            <div className={styles.checkboxContent}>
              <span className={styles.checkboxLabel}>Мінімальні ходи</span>
              <span className={styles.checkboxDesc}>
                Показувати оптимальну кількість ходів
              </span>
            </div>
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Поточні налаштування</h2>
        <div className={styles.currentSettings}>
          <div className={styles.settingRow}>
            <span>Складність:</span>
            <strong>{settings.difficulty} дисків</strong>
          </div>
          <div className={styles.settingRow}>
            <span>Автозбереження:</span>
            <strong>{settings.autoSave ? "Увімкнено" : "Вимкнено"}</strong>
          </div>
          <div className={styles.settingRow}>
            <span>Таймер:</span>
            <strong>{settings.showTimer ? "Показувати" : "Приховати"}</strong>
          </div>
          <div className={styles.settingRow}>
            <span>Мінімальні ходи:</span>
            <strong>
              {settings.showMinMoves ? "Показувати" : "Приховати"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
