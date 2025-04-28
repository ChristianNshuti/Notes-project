import React, { useState } from 'react'
import axios from 'axios';
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';



const UpdateProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [name,setName] = useState(storedUser?.name || '');
    const [email,setEmail] = useState(storedUser?.email || '');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleUpdate = async () => {
    try{
    const token = localStorage.getItem("token");
    const response = await axios.put("http://localhost:5000/api/auth/update",{name,email,password},{
        headers: {
            Authorization:`Bearer ${token}`
        }
    });
    alert("Profile updated!");
    localStorage.setItem("user",JSON.stringify(response.data.user));
    navigate('/dashboard');
    } catch(error){
    alert("Update failed");
    console.log(error);
}}
  return (
    <div className="profile-container">
        <h2>Update profile</h2>
        <input type="text" value={name} placeholder="New name" onChange={(e)=>setName(e.target.value)} />
        <input type="email" value={email} placeholder="New email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="New password" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={handleUpdate}>Save changes</button>
    </div>
  )
}
export default UpdateProfile
