

function AudioPlayer({ previewUrl, audioRef }){ 
    return (
        <div className="audio-player">
            <h1>Hello!</h1>
        <audio ref={audioRef} src={previewUrl} controls loop />
        </div>
    )
}

export default AudioPlayer