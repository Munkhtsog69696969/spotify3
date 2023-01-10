
import "./css/PlayList.css"
import { HiOutlineArrowUturnLeft } from "react-icons/hi2"
import { Outlet, Link, json } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


const baseURL = "http://localhost:7000";


export const PlayList = () => {
    const navigate=useNavigate();
    const [datas, setDatas] = useState(null);
    const [datas1,setDatas1]=useState([]);

    const userId=window.localStorage.getItem("user");

    // console.log((userId))

    useEffect(()=>{
        axios.get(baseURL+"/playlists")
            .then(async(res)=>{
                setDatas(res.data);
            }).catch((err)=>{
                console.log(err);
            })
    },[])


    useEffect(()=>{
        datas && datas.map((item,i)=>{
            if(item.creatorId==userId){
                datas1.push(item);
                setDatas1([...datas1]);
            }
        })
    },[datas]);

    // console.log(datas1);

    return (
        <>
            <div className="container-playlist">
                <div className="inner-container-playlist">
                    <Link to="/home">
                        <HiOutlineArrowUturnLeft className="icons-playlist"></HiOutlineArrowUturnLeft>
                    </Link>

                    <div>
                        <div className="addPlaylist-button">
                            <Link className="glow-on-hover" to="/AddPlaylist">Add PlayList</Link>
                        </div>

                        <div>
                            {
                                datas1 && datas1.map((item, i) => {
                                    console.log(item)
                                    return (
                                        <>
                                            <div key={i} className="playlist-container" onClick={()=>{
                                                localStorage.setItem("playlist",item._id);
                                                navigate("/songs");
                                            }}>
                                                <div className="playlist-container-inner" key={i}>
                                                    <img className="playlist-image" src="https://images5.alphacoders.com/113/1133668.jpg"></img>
                                                    <p className="playlist-desc">{item.title}</p>
                                                    <p className="playlist-time">{item.createdAt}</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}