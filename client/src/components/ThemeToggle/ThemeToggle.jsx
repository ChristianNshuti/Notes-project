import React from 'react';
import {BsSun,BsMoon} from 'react-icons/bs';
import { useState,useEffect } from 'react';

const ThemeToggle = () => {
    const [darkMode,setDarkMode] = useState(false);

    useEffect(()=> {

    const storedTheme = localStorage.getItem("theme");
    if(storedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-theme");
    }},[]); 

  const ToggleTheme = () => {
    setDarkMode(!darkMode);
    if(!darkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme","dark");
    }else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme","light")
    }
  };
  return(
    <button onClick={ToggleTheme} className="theme-toggle-button">
      {darkMode ? <BsSun size={24}/> : <BsMoon size={24} />}
    </button>
  )
  }

  export default ThemeToggle;