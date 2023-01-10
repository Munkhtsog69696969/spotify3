import "./css/LoginSignup.css"
import { useRef,useState,useContext,useEffect } from "react"
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { ThemeContext } from "../App";
import React from "react";
import { PlayList } from "./PlayList";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const Login=()=>{
    const baseURL="http://localhost:7000";

    const navigate=useNavigate();

    const userNameInput=useRef("");
    const userPasswordInput=useRef("");
    const emailInput=useRef("");
    const [userData,setUserData]=useState();

    async function Login(){
        const userName=userNameInput.current.value;
        const userPassword=userPasswordInput.current.value;
        const email=emailInput.current.value;

        await axios.post(baseURL+"/login" , {username:userName , password:userPassword})
            .then((response)=>{
                console.log(response.data);
                setUserData(response.data._id)
            }).catch((err)=>{
                console.log(err);
            })

        
        const auth = getAuth();

        if(userData!=undefined){
            signInWithEmailAndPassword(auth, email, userPassword)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("login successful");
                window.localStorage.setItem("user",userData);
                navigate("/home");
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage,errorCode)
            });
        }


        // signInWithEmailAndPassword(auth, email, userPassword)
        // .then((userCredential) => {
        //     // Signed in 
        //     const user = userCredential.user;
        //     console.log("login successful");
        //     navigate("/home");
        //     console.log(user)
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log(errorMessage,errorCode)
        // });

    }

    // if(userData!="user doesnt exist" && userData!="wrong username or password"){
    //     window.localStorage.setItem("user",userData);
    //     navigate("/home");
    // }

    return(
        <div className="signup-container">
            <div className="signup">
                <p className="signup-desc">Username:</p>
                <input placeholder="Username" ref={userNameInput}/>
                <p className="signup-desc">Password:</p>
                <input placeholder="Password" ref={userPasswordInput}/>
                <p className="signup-desc">Email:</p>
                <input placeholder="Email" ref={emailInput}/>

                <div className="signup-button-container">
                    <button className="signup-button" onClick={Login}>Log In</button>
                </div>
                {/* <p className="signup-desc">{userData}</p> */}
            </div>
        </div>
    )
}