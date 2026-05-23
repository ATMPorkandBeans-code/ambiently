import { useNavigate } from "react-router-dom";
import useFetchedAudio from "../hooks/fetchAudio";
import styles from "../styles/SoundCard.module.css";

const TOKEN = import.meta.env.VITE_FREESOUND_TOKEN;
const FIELDS = "id,name,duration,tags,username,previews,images,avg_rating";

function SoundCard({ id, name }) {
  const navigate = useNavigate();

  const url = `https://freesound.org/apiv2/sounds/${id}/?fields=${FIELDS}&token=${TOKEN}`;

  const { data, loading, error } = useFetchedAudio(url);

  if (loading)
    return (
      <div className={styles.loadingCard}>
        <div className={styles.loader}></div>
        <p>Loading soundscape...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.errorCard}>
        <p>Unable to load environment.</p>
      </div>
    );

  return (
    <div
      className={styles.card}
      onClick={() =>
        navigate(`/sound/${id}`, {
          state: { sound: data, name: name },
        })
      }
    >
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <span className={styles.badge}>Ambient Space</span>

        <h2 className={styles.name}>{name}</h2>

        <p className={styles.creator}>Created by {data?.username}</p>

        <div className={styles.tags}>
          {data?.tags?.slice(0, 4).map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        <button className={styles.listenButton}>Enter Environment</button>
      </div>
    </div>
  );
}

export default SoundCard;
