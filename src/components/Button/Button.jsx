import styles from "./Button.module.css";

function Button({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
}) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    disabled ? styles.disabled : "",
  ].join(" ");

  return (
    <button className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
