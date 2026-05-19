

export function AudioPlayer({ url }){ 
    return (
        <div className="audio-player">
            <h1>Hello!</h1>
        <audio src={url} controls loop />
        </div>
    )
}