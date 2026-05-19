function Countdown({ timeRemaining, timerActive, onPause, onCancel }){
    function formatTime(seconds){
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }

    return (
    <div className="countdown">
      <h2>{formatTime(timeRemaining)}</h2>
      <button onClick={onPause}>
        {timerActive ? 'Pause' : 'Resume'}
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
}
export default Countdown