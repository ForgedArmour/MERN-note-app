import React, { useState } from 'react'
import noteContext from './NoteContext'

export default function NoteStates(props) {
  const host = 'https://notesorange.up.railway.app/user/notes/';
  const userHost = 'https://notesorange.up.railway.app/user/auth/';
  const body = document.getElementsByTagName("body")[0];
  const defaultNote = [];
  const [isLogin, setIsLogin] = useState(localStorage.getItem("token") ? true : false);
  const [username,setUsername] = useState("")
  const [loading,setLoading] = useState(false)

  const [colorMode,setColorMode] = useState(localStorage.getItem('darkmode')==="true"?"dark":"light");
  if (localStorage.getItem('darkmode')==="true") {
      body.style.backgroundColor = "#010409";
  }
  else
  {
    body.style.backgroundColor = "#fff";
  }
  const setDarkmode = ()=>{
    if (colorMode==="light") {
      body.style.backgroundColor = "#010409";
      localStorage.setItem('darkmode',"true");
      setColorMode("dark");
    }
    else{
      localStorage.setItem('darkmode',"false");
      body.style.backgroundColor = "#fff";
      setColorMode("light");
    }
  }
  const [noteGroups,setNoteGroups] = useState([])
  const [notes, setNotes] = useState(defaultNote)
  const [msg, setMsg] = useState({
    msg: "",
    msgType: ""
  });
  const [currentNote, setCurrentNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: ""
  });

  const setAlert = (msg, msgtype) => {
    setMsg({
      msg: msg,
      msgType: msgtype
    })
  }

  const fetchUser = async ()=>{
    const user = await fetch(`${userHost}getuser`,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await user.json()
    if(data.status === "ok"){
      setUsername(data.user.name)
    }
  }

  const addNoteGroup = async (title)=>{
    const noteGroup = {
      title:title
    }
    const fetchedData = await fetch(`${host}createng`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body:JSON.stringify(noteGroup)      
    })
    const data = await fetchedData.json();
    if(data.status === "ok"){
      let temp = JSON.parse(JSON.stringify(noteGroups));
      temp.unshift(data.note_group);
      setNoteGroups(temp);
    }
  }
  const fetchNoteGroups = async ()=>{
    setLoading(true)
    const fetchedData = await fetch(`${host}fetchgroup`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await fetchedData.json()
    if(data.status==="ok"){
      setNoteGroups(data.notegroup)
    }
    setLoading(false)
  }

  const deleteNoteGroup = async (groupId)=>{
    const copyNg = noteGroups
    const newNote = noteGroups.filter((ng)=>{
      return ng._id!==groupId
    })
    setNoteGroups(newNote)
    const fetchedData = await fetch(`${host}deletenotegp/${groupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await fetchedData.json();
    if (data.status === "ok"){
    }
    else{
      setNoteGroups(copyNg)
    }
  }
  const fetchNotes = async (groupId) => {
    setLoading(true)
    const fetchedData = await fetch(`${host}fetchnotes/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const data = await fetchedData.json();
    if(data.notes.length===0){
      document.querySelector("#nonote").innerHTML = "No notes to display"
    }
    if(data.status==="ok"){
      setNotes(data.notes);
      console.log(data);
    }
    setLoading(false)
  }
  const addNote = async (title,description,tag,grpId) => {
    const myNote = {
      title: title,
      description: description,
      tag: tag
    };
    const fetchedData = await fetch(`${host}createnote/${grpId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(myNote)
    })
    const data = await fetchedData.json();
    if(data.status==="ok"){
      let temp = JSON.parse(JSON.stringify(notes));
      temp.unshift(data.note);
      setNotes(temp);
      let val = document.querySelector("#nonote").innerHTML
      if(val!==""){
        document.querySelector("#nonote").innerHTML = ""
      }
    }
  }

  const deleteNote = async (noteId) => {
    const copy = notes
    const newNote = notes.filter((note) => {
      return note._id !== noteId;
    })
    setNotes(newNote);

    const data = await fetch(`${host}deletenote/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    })
    const delNote = await data.json()
    if(delNote.status === "ok"){
    }
    else{
      setNotes(copy)
    }

  }

  const updateNote = async (noteId,noteInputs,navigate,grpId) => {
    const copy = notes
    const updatedNote = {
      title: noteInputs.title,
      description: noteInputs.description,
      tag: noteInputs.tag
    }
    let temp = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < notes.length; i++) {
      if (temp[i]._id === noteId) {
        temp[i].title = currentNote.title;
        temp[i].description = currentNote.description;
        temp[i].tag = currentNote.tag;
        break;
      }

    }
    setNotes(temp);
    const data = await fetch(`${host}updatenote/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(updatedNote)
    })
    const res = await data.json()
    if(res.status === "ok"){
      navigate(`/notes/${grpId}`)
    }
    else{
      setNotes(copy)
    }

  }

  const loginProvider = async (email, password,navigate) => {
    const myNote = {
      email: email,
      password: password,
    };
    const fetchedData = await fetch(`${userHost}userlogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(myNote)
    })
    const token = await fetchedData.json();
    if (!token.success) {
      setAlert("Error : Invalid credentials..", "warning");
    }
    else {
      localStorage.setItem('token', token.authToken);
      setIsLogin(true);
      navigate("/")
    }
  }
  const signUpProvider = async (name, email, password,navigate) => {
    const mySignup = {
      name: name,
      email: email,
      password: password,
    };
    const fetchedData = await fetch(`${userHost}createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mySignup)
    })

    const token = await fetchedData.json();
    if (!token.success) {
      setAlert("Error : User with this email already exists..", "warning");
    }
    else {
      localStorage.setItem('token', token.authToken);
      setAlert("Signup successfull..", "success");
      setIsLogin(true);
      navigate("/")
    }

  }

  const noteValues = {
    notes,colorMode,setDarkmode,setNotes, msg, setMsg, deleteNote, addNote, updateNote, currentNote, setCurrentNote, loginProvider, signUpProvider,fetchNotes,isLogin, setIsLogin,fetchUser,username,setUsername,noteGroups,fetchNoteGroups,addNoteGroup,deleteNoteGroup,loading,setNoteGroups
  }

  return (
    <noteContext.Provider value={noteValues}>
      {props.children}
    </noteContext.Provider>
  )
}
