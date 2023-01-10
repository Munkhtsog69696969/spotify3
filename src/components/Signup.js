import "./css/LoginSignup.css";
import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const baseURL="http://localhost:7000";

export const Signup=()=>{
    const userNameInput=useRef("");
    const userPasswordInput=useRef("");
    const emailInput=useRef("");
    const navigate=useNavigate();

    async function createUser(){
        const userName=userNameInput.current.value;
        const userPassword=userPasswordInput.current.value;
        await axios.post(baseURL+"/users",{username:userName , password:userPassword})
            .then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })

        await createUserWithEmailAndPassword(auth , emailInput.current.value , userPasswordInput.current.value)
        .then((userCredential)=>{
            const user=userCredential.user;
            console.log(user);
            navigate("/login");
        })
        .catch((error)=>{
            const errorCode=error.code;
            const errorMessage=error.Message;
            console.log(errorCode,errorMessage);
        })
            
        userNameInput.current.value="";
        userPasswordInput.current.value="";
        navigate("/login")
    }

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
                    <button className="signup-button" onClick={createUser}>Create new User</button>
                
                    <Link style={{display:"block" , fontSize:"15px",marginTop:"10px"}} to="/Login">already have an account? Click here</Link>
                </div>
            </div>
        </div>
    )
}