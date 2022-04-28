import React,{ useContext,useEffect,useState } from 'react'
import noteContext from '../../context/notes/NoteContext'
import './Home.css'
import NoteGroup from '../NoteGroup/NoteGroup';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate()
    const [title,setTitle] = useState("")
    const {addNoteGroup,colorMode,isLogin} = useContext(noteContext);
    const handleAddGroup = (e)=>{
        if(title.length>=3){
            e.preventDefault()
            addNoteGroup(title)
        }
    }
    const handleTitleChange = (e)=>{
        setTitle(e.target.value)
    }
    useEffect(()=>{
        if(!isLogin){
            navigate('/login')
        }
    })
    return (
        <>
            {isLogin &&<div className="container">
                <h1 className={`display-5 my-3 textmode-${colorMode}`}>Welcome to NotesOrange</h1>
                <form>
                    <div className="input-group add_notegroup_container mb-5">
                        <input type="text" className="form-control" placeholder="Name your Notegroup" aria-label="Name your Notegroup" aria-describedby="button-addon2" name='title' value={title} onChange={handleTitleChange} minLength={3} required />
                        <button className="btn btn-primary create_notegp_btn" onClick={handleAddGroup}>Add</button>
                    </div>
                </form>
                <NoteGroup />
            </div>}
        </>

    )

}
