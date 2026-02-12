import React, { useEffect, useState } from "react";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cookie_consent";

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveStored(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    // ignore
  }
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = readStored();
    if (!stored) {
      setVisible(true);
    } else {
      setConsent({
        necessary: true,
        analytics: !!stored.analytics,
        marketing: !!stored.marketing,
      });
      // initialize analytics if previously accepted
      if (stored.analytics) {
        import("../../utils/analytics")
          .then((m) => m.init())
          .catch(() => {});
      }
    }
  }, []);

  function acceptAll() {
    const next = { necessary: true, analytics: true, marketing: true };
    setConsent(next);
    saveStored(next);
    setVisible(false);
    import("../../utils/analytics")
      .then((m) => m.init())
      .catch(() => {});
  }

  function declineAll() {
    const next = { necessary: true, analytics: false, marketing: false };
    setConsent(next);
    saveStored(next);
    setVisible(false);
  }

  function savePreferences() {
    const next = {
      necessary: true,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
    };
    setConsent(next);
    saveStored(next);
    setVisible(false);
    if (next.analytics)
      import("../../utils/analytics")
        .then((m) => m.init())
        .catch(() => {});
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-live="polite">
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
