import { HiHome } from "react-icons/hi"
import { BsSearch } from "react-icons/bs"
import { BiLibrary } from "react-icons/bi"
import { AiFillPlusSquare } from "react-icons/ai"
import { BiHeartSquare } from "react-icons/bi"
import axios from "axios"
import React from "react";
import { useState, useEffect,useRef } from "react"

import { useNavigate } from "react-router-dom"

import { Outlet, Link } from "react-router-dom";
import "./css/Home.css"


const baseURL = "http://localhost:7000";


export const Home = () => {

    const navigate=useNavigate();
    
    const nameInput=useRef(null);
    
    const emailInput=useRef(null);

    function Enter (Name,Email){
        axios.post(baseURL,{name:Name , email:Email})
        .then((response) => {
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const userId=localStorage.getItem("user");

    const [user,setUser]=useState();

    const [playlists,setPlaylists]=useState();

    const [filteredPlaylists,setFilteredPlaylists]=useState([]);

    useEffect(()=>{
        axios.get(baseURL+"/users/"+userId)
        .then(async(res)=>{
            setUser(res.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[]);

    // console.log(user);

    useEffect(()=>{
        axios.get("http://localhost:7000/playlists")
           .then(async(res)=>{
            setPlaylists(res.data);
           }).catch((err)=>{
            console.log(err);
           })
    },[]);

    useEffect(()=>{
        playlists && playlists.map((item,i)=>{
            if(item.creatorId==userId){
                filteredPlaylists.push(item);
                setFilteredPlaylists([...filteredPlaylists]);
            }
        })
    },[playlists]);

    console.log(playlists)

    async function Logout(){
        localStorage.setItem("user","");
        navigate("/login");
    }

    return (
        <>
            <div className='container'>
                <div className='section1'>
                    <div style={{ marginBottom: "30px", margin: "25px" }}>
                        <Link to="/">
                            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" className="logo"></img>
                        </Link>
                    </div>

                    <div style={{ marginBottom: "30px", margin: "25px" }}>
                        <div className="centerDivAlign">
                            <HiHome className="icons"></HiHome>
                            <p className="texts">Home</p>
                        </div>

                        <div className="centerDivAlign">
                            <Link to="/search" className="centerDivAlign">
                                <BsSearch className="icons"></BsSearch>
                                <p className="texts">Search</p>
                            </Link>
                        </div>

                        <div className="centerDivAlign">
                            <BiLibrary className="icons"></BiLibrary>
                            <p className="texts">Your Library</p>
                        </div>
                    </div>

                    <div style={{ marginLeft: "25px" }}>
                        <Link to="/playlists" className="centerDivAlign">
                            <AiFillPlusSquare className="icons"></AiFillPlusSquare>
                            <p className="texts">Create Playlist</p>
                        </Link>
                    </div>

                    <div style={{ marginLeft: '25px' }}>
                        <Link to="/likedSongs" className="centerDivAlign">
                            <BiHeartSquare className="icons"></BiHeartSquare>
                            <p className="texts">Liked Songs</p>
                        </Link>
                    </div>

                    <p className="texts" onClick={Logout}>Log out</p>

                    <p style={{color:"white",marginLeft:"20px",fontSize:"20px"}}>Your Playlists:</p>

                    {
                        filteredPlaylists && filteredPlaylists.map((item,i)=>{
                            console.log(item)
                            return(
                                <div className="shown-container">
                                    <p className="shown-playlists"># {item.title}</p>
                                </div>
                            )
                        })
                    }

                </div>

                <div className="section2">
                    <div className="section2-1">
                        <div className="home-profile">
                            {user && user.username}
                        </div>
                    </div>

                    <div className="section2-2">
                        <div className="image-container">
                            <img className="image" src="https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000"/>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}