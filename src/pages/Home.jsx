import { useState } from "react";
import NavBar from "../components/NavBar";
import SoundCard from "../components/SoundCard";
import styles from "../styles/Home.module.css";
import { useAudio } from "../context/AudioContext"

const SOUND_IDS = [
  [126152, "Beach"],
  [467129, "Fireplace"],
  [346562, "Rain"],
  [265567, "Crickets"],
  [410742, "Birds"],
  [577846, "Thunderstorm"],
  [733199, "Stream"],
  [156414, "Desert Wind"],
];

function Home() {
  const [filter, setFilter] = useState("");

  const filteredSounds = SOUND_IDS.filter((sound) =>
    sound[1].toLowerCase().includes(filter.toLowerCase()),
  );

  const { savedSounds } = useAudio()

  return (
    <>
      <NavBar />

      <main className={styles.main}>
        <div className={styles.overlay}></div>

        <section className={styles.hero}>
          <h1 className={styles.title}>Ambiently</h1>

          <p className={styles.subtitle}>
            Drift into immersive sound environments designed for focus,
            relaxation, sleep, and calm.
          </p>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search environments..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </section>

        <section className={styles.soundSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose Your Environment</h2>

            <span className={styles.soundCount}>
              {filteredSounds.length} ambient spaces
            </span>
          </div>

          <div className={styles.soundGrid}>
            {filteredSounds.map((id) => (
              <SoundCard key={id[0]} id={id[0]} name={id[1]} />
            ))}
          </div>
        </section>
        {savedSounds.length > 0 && (
  <section className={styles.soundSection}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Your Saved Sounds</h2>
      <span className={styles.soundCount}>
        {savedSounds.length} saved
      </span>
    </div>
    <div className={styles.soundGrid}>
      {savedSounds.map((sound) => (
        <SoundCard key={sound.freesound_id} id={sound.freesound_id} name={sound.name} />
      ))}
    </div>
  </section>
)}
      </main>
    </>
  );
}

export default Home;
