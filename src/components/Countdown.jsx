import styles from "../styles/Countdown.module.css";

function Countdown({ timeRemaining, timerActive, onPause, onCancel }) {
  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  return (
    <div className={styles.countdown}>
      <div className={styles.glow}></div>

      <p className={styles.label}>Sleep timer active</p>

      <h2 className={styles.time}>{formatTime(timeRemaining)}</h2>

      <div className={styles.controls}>
        <button className={styles.pauseButton} onClick={onPause}>
          {timerActive ? "Pause" : "Resume"}
        </button>

        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Countdown;
