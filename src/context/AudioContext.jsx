import { createContext, useContext, useState } from "react";

const AudioContext = createContext()

export function AudioProvider({ children }) {
    const [savedSounds, setSavedSounds] = useState([])

    const addSound = (sound, customName) => {
        setSavedSounds(prev => {
            if(prev.find(s => s.id === sound.id)) return prev
            return [...prev, {...sound, name: customName}]
        })
    }

    return (
        <AudioContext.Provider value={{ savedSounds, addSound}}>
            {children}
        </AudioContext.Provider>
    )
}

export function useAudio() {
    return useContext(AudioContext)
}