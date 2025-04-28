import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
    const response =await axios.post("http://localhost:5000/api/auth/login",{email , password});
    console.log("Login successful",response.data);
    localStorage.setItem('token',response.data.token);
    localStorage.setItem('user',JSON.stringify(response.data.user))
    setEmail("");
    setPassword("");
    navigate("/dashboard");
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
    <div className="login-div">
     <h1>Login</h1> 
     Email:<input type="email" name="email" onChange={(e)=>{
      setEmail(e.target.value);
     }}/>
     Password:<input type="password" name="password" onChange={(e)=>{
      setPassword(e.target.value);
     }}/>
      <span onClick={(e)=>{navigate('/register')}}>Register!</span><br/> 
     <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
    </>
  )
}

export default Login
