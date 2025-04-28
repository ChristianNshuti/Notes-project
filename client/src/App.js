import './App.css';
import React from 'react';
import Register from './components/sign-up/register';
import Login from './components/login/login';
import {  BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/dashboard';
import Profile from './components/profile/Profile';
import UpdateProfile from './components/updateProfile/UpdateProfile';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
