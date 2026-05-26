import { useState } from "react";
import styles from "../styles/SleepTimer.module.css";

function SleepTimer({ onStart }) {
  const [showPicker, setShowPicker] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");

  const handleStart = () => {
    const seconds = Number(inputMinutes) * 60;

    if (!seconds) return;

    onStart(seconds);

    setShowPicker(false);
    setInputMinutes("");
  };

  return (
    <div className={styles.sleepTimer}>
      {!showPicker ? (
        <button
          className={styles.openButton}
          onClick={() => setShowPicker(true)}
        >
          Set Sleep Timer
        </button>
      ) : (
        <div className={styles.timerPicker}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Timer Duration</label>

            <input
              type="number"
              placeholder="Enter minutes..."
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.startButton} onClick={handleStart}>
              Start Timer
            </button>

            <button
              className={styles.cancelButton}
              onClick={() => setShowPicker(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SleepTimer;
