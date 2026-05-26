import { useState, useCallback, useEffect, useRef } from "react";
import SearchResultCard from "../components/SearchResultCard";
import AudioPlayer from "../components/AudioPlayer";
import NavBar from "../components/NavBar";
import { useAudio } from "../context/AudioContext";
import styles from "../styles/SoundSearch.module.css";

const TOKEN = import.meta.env.VITE_FREESOUND_TOKEN;

function SoundSearch() {
  const [query, setQuery] = useState("");
  const [sounds, setSounds] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef(null);

  const [selectedSound, setSelectedSound] = useState(null);

  const audioRef = useRef(null);

  const { savedSounds } = useAudio();

  // fetches paginated batch of sounds based on page state, hasMore, and query if not empty
  const fetchSounds = useCallback(async (searchQuery, pageNum) => {
    setLoading(true);
    const res = await fetch(
      `https://freesound.org/apiv2/search/text/?query=${searchQuery}&page=${pageNum}&page_size=20&fields=id,name,username,tags,previews&token=${TOKEN}`,
    );
    const data = await res.json();
    // adds new batch of sounds to previously fetched array of sounds
    setSounds((prev) => [...prev, ...data.results]);
    // checks the fetched data if .next is not none
    setHasMore(data.next !== null);
    setLoading(false);
  }, []);

  // handles search bar queries, resets pages to 1 and reruns fetchsounds with query
  useEffect(() => {
    setSounds([]);
    setPage(1);
    setHasMore(true);

    if (query) fetchSounds(query, 1);
  }, [query, fetchSounds]);

  // instantiates a new observer for sentinalRef at bottom of page, if it comes in view, it checks hasMore
  // and loading and sets the new page to + 1, thus achieving a "endless scroll" feel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) fetchSounds(query, page);
  }, [page, query, fetchSounds]);

  //   If "Preview Sound clicked on SearchSoundCard, audioplayer automatically starts with sound"
  useEffect(() => {
    if (selectedSound) {
      audioRef.current.play().catch((error) => {
        console.log("Playback prevented or failed:", error);
      });
    }
  }, [selectedSound]);

  return (
    <>
      <NavBar />

      <main className={styles.main}>
        <div className={styles.glow}></div>

        <section className={styles.hero}>
          <span className={styles.badge}>Discover New Soundscapes</span>

          <h1 className={styles.title}>Sound Search</h1>

          <p className={styles.subtitle}>
            Explore thousands of immersive ambient recordings and find the
            perfect atmosphere for focus, sleep, meditation, or relaxation.
          </p>

          <div className={styles.savedContainer}>
            <span className={styles.savedCount}>
              Saved Environments:
              <strong> {savedSounds.length}</strong>
            </span>
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rain, forest, cafe, ocean..."
              className={styles.searchInput}
            />
          </div>
        </section>

        {selectedSound && (
          <section className={styles.playerSection}>
            <AudioPlayer
              previewUrl={selectedSound.previews["preview-hq-mp3"]}
              audioRef={audioRef}
            />
          </section>
        )}

        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Ambient Results</h2>

            <span className={styles.resultCount}>
              {sounds.length} sounds found
            </span>
          </div>

          <div className={styles.resultsGrid}>
            {sounds.map((sound) => (
              <SearchResultCard
                key={sound.id}
                sound={sound}
                onPlay={() => setSelectedSound(sound)}
              />
            ))}
          </div>

          {loading && (
            <div className={styles.loading}>
              <div className={styles.loader}></div>
              <p>Loading environments...</p>
            </div>
          )}

          {!hasMore && sounds.length > 0 && (
            <p className={styles.endMessage}>
              You’ve reached the end of the soundscape.
            </p>
          )}

          <div ref={sentinelRef} />
        </section>
      </main>
    </>
  );
}

export default SoundSearch;
