import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const SoundsContext = createContext();

export function AudioProvider({ children }) {
  const [savedSounds, setSavedSounds] = useState([]);
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      setSavedSounds(user.sounds || [])
    } else {
      setSavedSounds([])
    }
  }, [user]);

  const addSound = (freesound_id, name) => {
    fetch(`${import.meta.env.VITE_API_URL}/sounds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ freesound_id, name }),
    })
    .then((r) => r.json())
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