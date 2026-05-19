import { useLocation, useNavigate } from "react-router-dom"
import { useRef } from 'react'
import NavBar from '../components/NavBar'
import  AudioPlayer from "../components/AudioPlayer"
import SleepTimer from "../components/SleepTimer"
import Countdown from "../components/Countdown"
import useSleepTimer from "../hooks/useSleepTimer"


function SoundEnvironment() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const data = state?.sound
  const previewUrl = data?.previews?.['preview-hq-mp3']
  const audioRef = useRef(null)

  const onExpire = () => {
    if(audioRef.current) {
      audioRef.current.pause()
    }
  }

  const {
    timeRemaining,
    timerActive,
    startTimer,
    pauseTimer,
    cancelTimer
  } = useSleepTimer(onExpire)

  const handlePause = () => {
    if(timerActive) {
      pauseTimer()
    } else {
      startTimer(timeRemaining)
    }
  }

  if (!data) return <p>Sound not found.</p>

  return (
    <>
      <NavBar />
      <main>
        <button onClick={() => navigate('/')}>← Back</button>
        <h1>{data.name}</h1>
        <p>by {data.username}</p>
        <p>{data.tags?.join(', ')}</p>
        <AudioPlayer previewUrl={previewUrl} audioRef={audioRef} />
        <SleepTimer onStart={(startTimer)} />
        {timeRemaining !== null && (
          <Countdown
          timeRemaining={timeRemaining}
          timerActive={timerActive}
          onPause={handlePause}
          onCancel={cancelTimer}
          />
        )}
      </main>
    </>
  )
}

export default SoundEnvironment