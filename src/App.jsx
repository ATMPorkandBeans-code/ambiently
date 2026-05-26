import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SoundEnviroment from './pages/SoundEnviroment'
import SoundSearch from "./pages/SoundSearch"
import { AudioProvider } from "./context/AudioContext"

function App() {

  return (
    <AudioProvider>
    <BrowserRouter basename="/ambiently">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sound/:id" element={<SoundEnviroment />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SoundSearch />} />
    </Routes>
    </BrowserRouter>
    </AudioProvider>
  );
}

export default App
