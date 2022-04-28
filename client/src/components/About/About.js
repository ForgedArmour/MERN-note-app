import React, { useContext }  from 'react'
import noteContext from '../../context/notes/NoteContext';
import './About.css'
export default function About() {
  const { colorMode } = useContext(noteContext);
    return (
        <div className="container my-3">
            <h1 className={`display-5 textmode-${colorMode}`}>About</h1>
            <hr className={`linemode-${colorMode}`} />
            <p className={`textmode-${colorMode}`}>Hello welcome to NotesOrange your personel note saving app. Here you can create, update, delete and view your notes. You can create note groups in which you can organize your note based on a topic. Happy Note Making 😀</p>
        </div>
    )
}
