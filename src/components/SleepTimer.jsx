import { useState } from 'react'

function SleepTimer({ onStart }) {
    const [showPicker, setShowPicker] = useState(false)
    const [inputMinutes, setInputMinutes] = useState('')

    const handleStart = () => {
        const seconds = Number(inputMinutes) * 60
        if (!seconds) return
        onStart(seconds)
        setShowPicker(false)
        setInputMinutes('')
    }

    return (
        <div className="sleep-timer">
            {!showPicker ? (
                <button onClick={() => setShowPicker(true)}>
                    Set Sleep Timer
                </button>
            ) : (
                <div className='timer-picker'>
                    <input
                    type='number'
                    placeholder='Minutes'
                    value={inputMinutes}
                    onChange={(e) => setInputMinutes(e.target.value)}
                    />
                    <button onClick={handleStart}>Start</button>
                    <button onClick={() => setShowPicker(false)}>Cancel</button>
                    </div>
            )}
            </div>    
    )
}

export default SleepTimer