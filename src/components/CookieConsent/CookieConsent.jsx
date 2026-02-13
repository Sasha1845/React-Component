import React, { useState } from "react";
import styles from "./CookieConsent.module.css";

function CookieConsent() {
  const [visible, setVisible] = useState(true); // Показуємо банер одразу
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  function acceptAll() {
    const next = { necessary: true, analytics: true, marketing: true };
    setConsent(next);
    setVisible(false);
    // Тут можна додати логіку ініціалізації аналітики
    console.log("Analytics enabled");
  }

  function declineAll() {
    const next = { necessary: true, analytics: false, marketing: false };
    setConsent(next);
    setVisible(false);
  }

  function savePreferences() {
    const next = {
      necessary: true,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
    };
    setConsent(next);
    setVisible(false);
    if (next.analytics) {
      console.log("Analytics enabled");
    }
  }

  if (!visible) return null;

  return (
    <div
      className={`${styles.banner} ${styles.visible}`}
      role="dialog"
      aria-live="polite"
    >
      <div className={styles.content}>
        <div className={styles.text}>
          Ми використовуємо cookie для покращення роботи сайту. Деталі — у
          <a href="/PRIVACY.md"> політиці приватності</a>.
          <div className={styles.categories}>
            <label>
              <input type="checkbox" checked disabled /> Necessary (required)
            </label>
            <label>
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) =>
                  setConsent((s) => ({ ...s, analytics: e.target.checked }))
                }
              />
              Analytics
            </label>
            <label>
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) =>
                  setConsent((s) => ({ ...s, marketing: e.target.checked }))
                }
              />
              Marketing
            </label>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.decline} onClick={declineAll}>
            Відхилити всі
          </button>
          <button className={styles.save} onClick={savePreferences}>
            Зберегти налаштування
          </button>
          <button className={styles.accept} onClick={acceptAll}>
            Прийняти всі
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
