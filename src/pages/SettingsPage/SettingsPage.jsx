import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import SettingsPanel from "../../components/SettingsPanel/SettingsPanel";
import { useSettingsStore } from "../../stores/useSettingsStore";
import styles from "./SettingsPage.module.css";

function SettingsPage() {
  const navigate = useNavigate();
  const resetSettings = useSettingsStore((state) => state.resetSettings);

  const handleBack = () => {
    navigate("/");
  };

  const handleReset = () => {
    if (window.confirm("Ви впевнені, що хочете скинути всі налаштування?")) {
      resetSettings();
    }
  };

  return (
    <div className={styles.settingsPage}>
      <Card>
        <div className={styles.header}>
          <Button onClick={handleBack} variant="secondary" size="small">
            ← Назад
          </Button>
          <h1 className={styles.title}>Налаштування</h1>
          <Button onClick={handleReset} variant="secondary" size="small">
            🔄 Скинути
          </Button>
        </div>

        <SettingsPanel />
      </Card>
    </div>
  );
}

export default SettingsPage;
