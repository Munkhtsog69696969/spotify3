import "./css/SongPlayer.css"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const SongPlayer=()=>{
    const src=localStorage.getItem("audioSrc");
    const name=localStorage.getItem("audioName");
    console.log(src);
    return(
        <div className="songPlayer-container">
            <div className="songPlayer-container1">

                <div className="songPlayer-container2">
                    <p className="songPlayer-desc1">Currently Playing:</p>

                    <p className="songPlayer-desc2">{name}</p>
                </div>

                <AudioPlayer
                    // autoPlay
                    src={src}
                    onPlay={()=>{console.log("playing sound")}}
                    className="audioPlayer"
                />
            </div>
        </div>
    )
}