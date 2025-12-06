import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../Button/Button";
import { useSettingsStore } from "../../stores/useSettingsStore";
import styles from "./SettingsForm.module.css";

const schema = yup.object().shape({
  difficulty: yup
    .number()
    .min(3, "Мінімум 3 диски")
    .max(7, "Максимум 7 дисків")
    .required("Оберіть складність"),
  autoSave: yup.boolean(),
  showTimer: yup.boolean(),
  showMinMoves: yup.boolean(),
});

function SettingsForm({ onSubmit, onCancel }) {
  const difficulty = useSettingsStore((state) => state.difficulty);
  const autoSave = useSettingsStore((state) => state.autoSave);
  const showTimer = useSettingsStore((state) => state.showTimer);
  const showMinMoves = useSettingsStore((state) => state.showMinMoves);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      difficulty,
      autoSave,
      showTimer,
      showMinMoves,
    },
  });

  const onFormSubmit = (data) => {
    updateSettings(data);
    onSubmit(data.difficulty);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Складність гри</label>
        <select {...register("difficulty")} className={styles.select}>
          <option value={3}>🟢 Легко (3 диски)</option>
          <option value={4}>🟡 Середньо (4 диски)</option>
          <option value={5}>🟠 Важко (5 дисків)</option>
          <option value={6}>🔴 Дуже важко (6 дисків)</option>
          <option value={7}>⚫ Експерт (7 дисків)</option>
        </select>
        {errors.difficulty && (
          <span className={styles.error}>{errors.difficulty.message}</span>
        )}
      </div>

      <div className={styles.checkboxGroup}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("autoSave")} />
          <span>Автоматично зберігати налаштування</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("showTimer")} />
          <span>Показувати таймер</span>
        </label>

        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register("showMinMoves")} />
          <span>Показувати мінімальну кількість ходів</span>
        </label>
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Скасувати
          </Button>
        )}
        <Button type="submit" variant="success">
          Почати гру
        </Button>
      </div>
    </form>
  );
}

export default SettingsForm;
