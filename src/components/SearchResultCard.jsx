import { useAudio } from "../context/AudioContext";
import { useState } from "react";

import styles from "../styles/SearchResultCard.module.css";

function SearchResultCard({ sound, onPlay }) {
  const [showPicker, setShowPicker] = useState(false);
  const [inputName, setInputName] = useState("");
  const { addSound } = useAudio();

  return (
    <div className={styles.card}>
      <div className={styles.glow}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.badge}>Community Sound</span>

          <h2 className={styles.title}>{sound.name}</h2>

          <p className={styles.creator}>Created by {sound.username}</p>
        </div>

        <div className={styles.tags}>
          {sound.tags?.slice(0, 4).map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.previewButton} onClick={onPlay}>
            Preview Sound
          </button>

          {!showPicker ? (
            <button
              className={styles.saveButton}
              onClick={() => setShowPicker(true)}
            >
              Save Custom Sound
            </button>
          ) : (
            <div className={styles.savePanel}>
              <input
                type="text"
                placeholder="Enter custom name..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className={styles.input}
              />

              <div className={styles.saveActions}>
                <button
                  className={styles.confirmButton}
                  onClick={() => {
                    if (!inputName.trim()) return;

                    addSound(sound, inputName);

                    setShowPicker(false);
                    setInputName("");
                  }}
                >
                  Save Sound
                </button>

                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowPicker(false);
                    setInputName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
