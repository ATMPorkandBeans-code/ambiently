import { useState } from "react";
import styles from "../styles/SleepTimer.module.css";

function SleepTimer({ onStart }) {
  const [showPicker, setShowPicker] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");
  const [error, setError] = useState("")

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
              min="1"
              step="1"
              placeholder="Enter minutes..."
              value={inputMinutes}
              onKeyDown={(e) => {
              if (["-", "+", ".", "e"].includes(e.key)) e.preventDefault();
            }}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "" || /^\d+$/.test(raw)) {
                setInputMinutes(raw);
                setError("");
              } else {
                setError("Please enter a positive integer.");
              }
            }}
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
