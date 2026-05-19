// import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"
import SoundCard from '../components/SoundCard'

const SOUND_IDS = [126152, 467129, 346562]

function Home() {
    return (
        <>
        <NavBar />
        <main>
            <h1>Ambiently.....</h1>
            <div className="sound-list">
                {SOUND_IDS.map(id => (
                    <SoundCard key={id} id={id} />
                ))}
            </div>
        </main>
        </>
    )
}

export default Home