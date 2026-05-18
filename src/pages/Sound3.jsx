import NavBar from "../components/NavBar"
import { use, useEffect, useState } from "react"
import useFetchedAudio from "../hooks/fetchAudio";

const url = 'https://freesound.org/apiv2/sounds/346562/?fields=id,name,duration,tags,username,previews,images,avg_rating&token=xPfsfMxzmzBnHlBkuYmaLIuMzdyPdR1z1oT86XLb'

function Sound3(){
    const { data, loading, error } = useFetchedAudio(url)

    const content = loading 
    ? <p>Setting the mood...</p>
    : <div className="player">.
    <audio
          src={data.previews["preview-hq-mp3"]}
          controls
          loop
        />
    </div>

    return (
        <>
        <NavBar />
        <h1>Sound 3!!!</h1>
        <div className="sound-page">
            {content}
        </div>
        </>
    )
}

export default Sound3