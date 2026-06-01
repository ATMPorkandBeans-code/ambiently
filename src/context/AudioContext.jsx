import { createContext, useContext, useState, useEffect } from "react";

const SoundsContext = createContext();

export function AudioProvider({ children }) {
  const [savedSounds, setSavedSounds] = useState([]);

  useEffect(() => {
    fetch("/sounds")
      .then((r) => r.json())
      .then((soundsArray) => {
        setSavedSounds(soundsArray);
      });
  }, []);


  const addSound = (freesound_id, name) => {
    fetch("/sounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body :JSON.stringify({freesound_id, name}),
    })
    .then ((r) => r.json())
    .then(newSound => {
      setSavedSounds(prev => [...prev, newSound])
    })
  }

  return (
    <SoundsContext.Provider value={{ savedSounds, addSound }}>
      {children}
    </SoundsContext.Provider>
  );
}

export function useAudio() {
  return useContext(SoundsContext);
}
