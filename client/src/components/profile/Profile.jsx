import React, { useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [name,setName] = useState(user?.name || '');
    const [email] = useState(user?.email || '');
    const navigate = useNavigate();
    
    const handleSave = () => {
    const updatedUser = {...user,name};
    localStorage.setItem("user",JSON.stringify(updatedUser));
    };

    const editUser = () => {
    navigate('/UpdateProfile');
    }

    if(!user) {
        return <p>User not found, please login again</p>;
    }
     
  return (
    <div className="profile-container">
        <h2 className="profile-heading">👤 your profile</h2>
        <div className="profile-info">
                <p><strong>Name:</strong>{name}</p>
                <p><strong>Email:</strong>{email}</p>
                <button onClick={editUser}>Edit</button>
        </div>
    </div>
  );
};

export default Profile
