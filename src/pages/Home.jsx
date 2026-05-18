import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"

function Home() {
    return (
        <>
        <NavBar />
        <main>
            <h1>Ambiently.....</h1>
            <nav>
                <Link to="/sounds">To sound Enviroments</Link>
                <Link to="/about">Learn more about Ambiently.</Link>
            </nav>
        </main>
        </>
    )
}

export default Home