import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async() => {
    try{
    await axios.post("http://localhost:5000/api/auth/register",{name,email,password});
    setName("");
    setEmail("");
    setPassword("");
    navigate('/login');
    }catch(error) {
      console.log(error);
    }
  }
  return (
    <div className="register-div">
      <h1>Register</h1>
      Name:<input type="text" name="name" onChange={(e) => {
        setName(e.target.value)
      }} />
      Email:<input type="text" name="email" onChange={(e) => {
        setEmail(e.target.value)
      }}/>
      Password:<input type="password" name="password" onChange={(e) => {
        setPassword(e.target.value)
      }}/>
      <span onClick={(e)=>{navigate('/login')}}>Already registered</span><br/> 
      <button className="register-button" onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
