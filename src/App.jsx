import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SoundContainer from "./pages/SoundContainer"
// import Soundlist from "./pages/SoundList"
import Sound1 from "./pages/Sound1"
import Sound2 from "./pages/Sound2"
import Sound3 from "./pages/Sound3"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sounds" element={<SoundContainer />}/> 
        {/* <Route path="" element={<SoundList />} /> */}
          <Route path="/sounds/sound1" element={<Sound1 />} />
          <Route path="/sounds/sound2" element={<Sound2 />} />
          <Route path="/sounds/sound3" element={<Sound3 />} />
         
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
