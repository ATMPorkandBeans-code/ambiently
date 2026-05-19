import { useNavigate } from 'react-router-dom'
import useFetchedAudio from '../hooks/fetchAudio'

const TOKEN = 'xPfsfMxzmzBnHlBkuYmaLIuMzdyPdR1z1oT86XLb'
const FIELDS = 'id,name,duration,tags,username,previews,images,avg_rating'

function SoundCard({ id }) {
    const navigate = useNavigate()
    const url = `https://freesound.org/apiv2/sounds/${id}/?fields=${FIELDS}&token=${TOKEN}`
    const { data, loading, error } = useFetchedAudio(url)

    if (loading) return <div className="sound-card">Loading...</div>
    if (error) return <div className="sound-card">Error loading sound.</div>

    return (
        <div
        className="sound-card"
        onClick={() => navigate(`/sound/${id}`, { state: { sound: data } })}
        style={{ cursor: 'pointer'}}
        >
            <h2>{data?.tags[0]}</h2>
            <p>{data?.username}</p>
            <p>{data?.tags?.slice(0, 5).join(', ')}</p>
        </div>
    )
}

export default SoundCard