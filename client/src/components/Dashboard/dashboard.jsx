import axios from 'axios';
import './dashboard.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useNavigate } from 'react-router-dom';

const  Dashboard = () => {
    const [notes,setNotes] = useState([]);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [tags,setTags] = useState("");
    const [editingNoteId,setEditingNoteId] = useState(null);
    const [loading,setLoading] = useState(true);
    const [searchText,setSearchText] = useState('');
    const navigate = useNavigate();

    let user = null;
  const storedUser = localStorage.getItem('user');

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
    user = null;
  }

  const username = user?.name || "User";


    useEffect(() => {
    const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    try{
      if(token) {
    const response = await axios.get("http://localhost:5000/api/notes",{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    setNotes(response.data);
    }}
    catch(error) {
        alert(error)
    }finally{
      setLoading(false);
    }
    };
    fetchNotes();
    },[]);
    const handleSaveNote = async () => {
      try{
        const token = localStorage.getItem('token');
        const noteData = {
          title,
          content,
          tags:tags.split(',').map((tag)=>tag.trim())
      }
      if(editingNoteId) {
        const response = await axios.put(`http://localhost:5000/api/notes/${editingNoteId}`,noteData,{
          headers: {
            Authorization:`Bearer ${token}`
          }
        });
        setNotes(notes.map(note=>note._id === editingNoteId ? response.data : note));
      }
      else {
        const response = await axios.post("http://localhost:5000/api/notes",noteData, {
          headers:{
          Authorization:`Bearer ${token}`
        }});
        setNotes([...notes,response.data]);
      }
      setTitle("");
      setContent("");
      setTags("");
      }
    catch(error) {
      alert(error);
    }
  }
    const handleEditNote = (note) => {
      setTitle(note.title);
      setContent(note.content);
      setTags(note.tags);
      setEditingNoteId(note._id);
    } 

    const handleDeleteNote = async (id) => {
      try{
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/notes/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setNotes(notes.filter(note=>note._id!==id));
      }catch(error){
        alert("Error while deleting the notes",error);
      }
    }

    const handleLogout = async () => {
     localStorage.removeItem("token");
      window.location.href='/login';
    }
  if(loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading notes...</p>
      </div>
    )
  }

  const editProfile = () => {
    navigate('/profile')
  }
  return (
    <div className="dashboard-div">
      <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
        <h1 className="headingOne">Dashboard</h1>
        <p className="welcome-text">👤 Welcome, {username}</p>
        <button onClick={editProfile} className="edit-user-button">Edit user</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ThemeToggle />
          <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      </div>
      <h3 className="headingThree">Add a new note</h3>
      <input className="input" type="text" value={title} placeholder="Title here" onChange={(e)=>setTitle(e.target.value)}/>
      <textarea className="text-area" value={content} placeholder="Content here" onChange={(e)=>{setContent(e.target.value)}} />
      <input className="input" type="text" value={tags} placeholder="Tags here (must be comma separated)" onChange={(e)=>{setTags(e.target.value)}}/>
      <button className="button" onClick={handleSaveNote}>{editingNoteId? "Update Note":"Add note"}</button>
      <p className="desc">This is where your notes will appear!</p>
      <input className="input search-input" type="text"  value={searchText} placeholder="Search notes...." onChange={(e)=>setSearchText(e.target.value)}/>
      <ul className="ul-list">
        {notes
        .filter(note=>
          note.title.toLowerCase().includes(searchText.toLowerCase()) ||
          note.content.toLowerCase().includes(searchText.toLowerCase()) ||
          note.tags.join(', ').toLowerCase().includes(searchText.toLowerCase())
        )
        .map((note)=>(
          <li className="note-listed"key={note._id}>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-content">{note.content}</p>
            <small className="note-tag">Tag: {note.tags}</small><br/>
            <button className="edit-button" onClick={()=>{handleEditNote(note)}}>edit</button>
            <button className="delete-button" onClick={()=>{handleDeleteNote(note._id)}}>delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
    }

export default Dashboard
