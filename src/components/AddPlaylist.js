import "../components/css/AddPlaylist.css"

import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const baseURL="http://localhost:7000";

export const AddPlaylist=()=>{
    const inputTitle=useRef("");

    const userId=window.localStorage.getItem("user");

    console.log(userId)

    async function Done(){
        const title=inputTitle.current.value;

        await axios.post(baseURL+"/playlists" , {title:title , date:new Date().toLocaleString() , creatorId:userId});
    }

    return(
        <div className="AddPlaylist-container">
            <div className="inner">
                <p className="desc">Create Playlist</p>

                <div style={{margin:"30px"}}>
                    <p className="desc">PlayList title</p>
                    <input placeholder="Title" ref={inputTitle}/>
                </div>

                <Link to="/playlists" onClick={Done} className="done">Done</Link>
            </div>
        </div>
    )
}