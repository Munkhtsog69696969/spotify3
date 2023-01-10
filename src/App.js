import './App.css';
import {useState,useEffect} from "react"
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home"
import { PlayList } from './components/PlayList';
import { Search } from "./components/Search"
import {AddPlaylist} from "./components/AddPlaylist"
import { Signup } from './components/Signup';
import {Login} from "./components/Login"
import { Song } from './components/Song';
import { LikedSongs } from './components/LikedSongs';
import { SongPlayer } from './components/SongPlayer';
import React from 'react';

export const ThemeContext=React.createContext();

function App() {
  let [userData,setUserData]=useState("user");
  return (
    <ThemeContext.Provider value={userData}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/playlists' element={<PlayList/>}/>
          <Route path='/songs' element={<Song/>}/>
          <Route path='/LikedSongs' element={<LikedSongs/>}/>
          <Route path='/player' element={<SongPlayer/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/AddPlaylist' element={<AddPlaylist/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;