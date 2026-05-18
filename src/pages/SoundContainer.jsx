import { Link, Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
// import SoundList from "./SoundList"

function SoundContainer() {
    return (
        <>
            <NavBar />
            <main>
                <nav>
                <h1>Welcome to the Sounds Library</h1>
                <Link to="/sounds/sound1">Sound 1</Link>
                <Link to="/sounds/sound2">Sound 2</Link>
                <Link to="/sounds/sound3">Sound 3</Link>
                </nav>

            {/* <Outlet /> */}
            </main>
        
        
        </>
    )
}

export default SoundContainer;