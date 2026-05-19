import { useLocation, useNavigate } from "react-router-dom"
import NavBar from '../components/NavBar'
import { AudioPlayer } from "../components/AudioPlayer"

function SoundEnvironment() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const data = state?.sound

 const previewUrl = data?.previews?.['preview-hq-mp3']

  if (!data) return <p>Sound not found.</p>

  return (
    <>
      <NavBar />
      <main>
        <button onClick={() => navigate('/')}>← Back</button>
        <h1>{data.name}</h1>
        <p>by {data.username}</p>
        <p>{data.tags?.join(', ')}</p>
        <AudioPlayer url={previewUrl} />
        {/* previewUrl is ready for your AudioPlayer tomorrow */}
        <p style={{ fontSize: '0.75rem', color: '#999' }}>Preview URL: {previewUrl}</p>
      </main>
    </>
  )
}

export default SoundEnvironment