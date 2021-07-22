import React, { useState, useEffect, Component } from 'react';
import { useHistory } from 'react-router-dom';
//import axios from 'axios';
import "./style.scss";

function Login(){
    const [user_name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    let data = '';

    useEffect(() => {
        if(localStorage.getItem('user-info')){
            let user_info = JSON.parse(localStorage.getItem('user-info'));
            console.log(user_info.status)
            if(user_info.status) history.push("/profile");
            else history.push("/login");
        }
    }, [])

    function resetForm(){
        setPassword('')
    }

    async function login(){

        let item = {password, user_name};
        try{
            let result = await fetch("/users/login",{
                method: 'POST',
                body: JSON.stringify(item),
                headers : {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                }
            });
            result = await result.json();
            console.warn(result)
            localStorage.setItem('user-info',JSON.stringify(result))
            data = JSON.parse(localStorage.getItem('user-info'));
            if(data.status){
                setErrorMessage('');
                history.push("/profile")
            }
            else{
                resetForm();
                setErrorMessage('Unauthorized');
            }
        }
        catch(e){
        }
    }

    // data = JSON.parse(localStorage.getItem('user-info'));
    return(
        <div className= "container-2">    
        <div className= "base-container-2">
            <div className="header-2">Login</div>
             <div className="content-2">
                 <div className="form-2">
                     <div className="form-group-2">
                         <input type="text" className="username" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                     </div>
                     <div className="form-group-2">
                         <input type="password" className="password" value={password} placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                     </div>
                 </div> 
             </div>
             <div className="error">{errorMessage}</div>
             <div className="footer-2">
                 <button type="button" className="btn" onClick={login}>
                     Login
                 </button>
                 <div className="create-account">
                    <a href="http://localhost:3000/register">Creat account!</a>
                </div>
             </div>
        </div>
        </div>
        );
}

export default Login;