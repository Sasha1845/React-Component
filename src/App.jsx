import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import styles from "./App.module.css";
import CookieConsent from "./components/CookieConsent/CookieConsent";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppRoutes />
        <CookieConsent />
      </div>
    </BrowserRouter>
  );
}

export default App;
