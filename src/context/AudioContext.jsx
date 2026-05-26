import { createContext, useContext, useState, useEffect } from "react";

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const [savedSounds, setSavedSounds] = useState(() => {
    const saved = localStorage.getItem("id");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("id", JSON.stringify(savedSounds));
  }, [savedSounds]);

  const addSound = (sound, customName) => {
    setSavedSounds((prev) => {
      if (prev.find((s) => s.id === sound.id)) return prev;
      return [...prev, { ...sound, name: customName }];
    });
  };

  return (
    <AudioContext.Provider value={{ savedSounds, addSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
