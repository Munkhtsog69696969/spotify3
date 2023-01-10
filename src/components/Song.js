import "./css/Song.css"
import { useRef, useState, useEffect } from "react"
import axios from "axios";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";

const baseURL = "http://localhost:7000";

export const Song = () => {
    const navigate = useNavigate();

    const songNameInput = useRef("");

    const [songs, setSongs] = useState();

    const [songPLay,setSongPlay] = useState();

    const [songs1, setSongs1] = useState([]);

    const playlistId = localStorage.getItem("playlist");

    const number = useRef(0);

    //console.log(playlistId);

    useEffect(() => {
        axios.get(baseURL + "/songs")
            .then(async (res) => {
                setSongs(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    // console.log(songs1);

    async function Done() {
        const name = songNameInput.current.value;
        if (name != "") {
            await axios.post(baseURL+"/songs",{name:name , playlistId:playlistId})
                .then(async(res)=>[
                    console.log(res)
                ])
        }
    }


    // console.log(localStorage.getItem("songData"));

    function playSong(songName){
        let src=""
        let imageSrc="";
        if(songName=="Perfect Girl 1 hour version"){
            src="https://firebasestorage.googleapis.com/v0/b/spotify-d3b51.appspot.com/o/the_perfect_girl_slowed_reverb_for_1_hour_-7684800465492023119.mp3?alt=media&token=7b6794b6-0373-4db0-b326-5b92d966ed45";
        }
        if(songName=="It's just a burning memory"){
            src="https://firebasestorage.googleapis.com/v0/b/spotify-d3b51.appspot.com/o/the_caretaker_it_s_just_a_burning_memory_2016_-5975864331540863618.mp3?alt=media&token=fa2882a6-bf75-441d-97e0-f6e0e86c462f";
        }
        if(songName=="Call me"){
            src="https://firebasestorage.googleapis.com/v0/b/spotify-d3b51.appspot.com/o/sigma_song_call_me_extended_plenka_patrick_bateman_american_psycho_8878114228866724907.mp3?alt=media&token=d27d54cb-6f9e-449e-aed9-cd3097e4d3cc";
        }
        localStorage.setItem("audioSrc",src);
        localStorage.setItem("audioName",songName);
        navigate("/player");
    }

    async function AddSongToPlaylist(songId){
        await axios.put(baseURL+"/playlists/"+playlistId , {id:songId})
           .then(async(res)=>{
            console.log(res);
           }).catch((err)=>{
            console.log(err);
           })
    }

    useEffect(()=>{
        axios.get(baseURL+"/playlists/"+playlistId)
            .then(async(res)=>{
                console.log(res.data.songs);
                setSongs1(res.data.songs);
            }).catch((err)=>{
                console.log(err);
            })
    },[])



    return (
        <div className="songs-container">
            <div className="song-container-inner">
                <p className="desc1">Song name</p>
                <input placeholder="Song name" ref={songNameInput} />
                <button className="song-button" onClick={Done}>Done</button>
                <div className="songs">
                    <p style={{marginLeft:"20px",color:"white",fontSize:"30px",fontWeight:"bold"}}>This playlist's songs:</p>
                    {
                        songs1 && songs1.map((item,i)=>{
                            return(
                                <div className="div-song" key={i}>
                                    <div className="div-number">{i+1}</div>
                                    <div className="div-name">
                                        {item.name}
                                        <div onClick={()=>playSong(item.name)} style={{display:"inline-block",marginLeft:"20px"}}>Play</div>
                                    </div>
                                </div>
                            )
                        })
                    }


                    <p style={{marginLeft:"20px",color:"white",fontSize:"30px",fontWeight:"bold"}}>All songs:</p>
                    {
                        songs && songs.map((item, i) => {
                            // console.log(item)
                            return (
                                <div className="div-song" key={i}>
                                    <div className="div-number">{i + 1}</div>
                                    <div className="div-name">
                                        {item.name}
                                        <AiOutlineHeart style={{ marginLeft: "20px" }}></AiOutlineHeart>
                                        <div onClick={()=>playSong(item)} style={{display:"inline-block",marginLeft:"20px"}}>Play</div>
                                        <div onClick={()=>AddSongToPlaylist(item._id)} style={{display:"inline-block",marginLeft:"20px"}}>Add</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}