import styles from "../styles/AudioPlayer.module.css";

function AudioPlayer({ previewUrl, audioRef }) {
  return (
    <div className={styles.audioPlayer}>
      <div className={styles.glow}></div>

      <div className={styles.header}>
        <div>
          <p className={styles.label}>Ambient Playback</p>

          <h2 className={styles.title}>Audio Controls</h2>
        </div>

        <div className={styles.status}>
          <span className={styles.pulse}></span>
          Loop Enabled
        </div>
      </div>

      <div className={styles.playerContainer}>
        <audio
          ref={audioRef}
          src={previewUrl}
          controls
          loop
          className={styles.audio}
        />
      </div>

      <p className={styles.helperText}>
        Press play and allow the environment to fade into the background.
      </p>
    </div>
  );
}

export default AudioPlayer;
