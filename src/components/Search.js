import "./css/Search.css"

import { useState, useEffect } from "react";

import axios from "axios";

export const Search = () => {
const [searchInput, setSearchInput] = useState("");
const [accessToken, setAccessToken] = useState("");
const [playingTrack, setPlayingTrack] = useState();
const [albums, setAlbums] = useState([]);

const CLIENT_ID = "2d4acd494df54c8095e6210021b0d09d";
const CLIENT_SECRET = "5c2928153ab944e6b598205f73601fa6";


useEffect(() => {
    //API Access Token
    var authParameters = {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
    .then((result) => result.json())
    .then((data) => {
        setAccessToken(data.access_token);
        console.log(data.access_token);
    });
}, []);

//Search
async function search() {
    console.log("Search For " + searchInput);

    //Get req using search to get Artist ID
    var searchParameters = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
    },
    };
    var artistID = await fetch(
    "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
    searchParameters
    )
    .then((response) => response.json())
    .then((data) => {
        return data.artists.items[0].id;
    });
    console.log("Artist ID " + artistID);

    var returnedAlbums = await fetch(
    "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
    searchParameters
    )
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        setAlbums(data.items);
    });
}
console.log(albums);

return (
    <>
        <div className="search-div1">
            <div>
                <input
                    className="search-input"
                    placeholder="Search"
                    type="input"
                    onKeyDown={(event) => {
                        if (event.key == "Enter") {
                        search();
                        }
                    }}
                    onChange={(event) => setSearchInput(event.target.value)}
                />

                {/* <button
                    className="search-button"
                    onClick={() => {
                        search();
                    }}
                    >
                    Search
                </button> */}
            </div>

            <div className="search-div2">
                {albums.map((album, index) => {
                    return (
                        <div className="search-album-div">
                            <img src={album.images[0].url} className="search-album-image"/>
                            <p className="search-album-title">{album.name}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    </>
);
};