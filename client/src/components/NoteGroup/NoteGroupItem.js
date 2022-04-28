import React,{useContext} from 'react'
import noteContext from '../../context/notes/NoteContext';
import './NoteGroupItem.css'
import { useNavigate } from 'react-router-dom';
export default function Noteitem(props) {
    const {setMsg,colorMode,deleteNoteGroup} = useContext(noteContext);
    let navigate = useNavigate()

    //when user clicks delete icon on specific note
    const handleDelete = async ()=>{
        await deleteNoteGroup(props.note._id);
        setMsg("Deleted Successfully");
    }

    const handleGetNotes = ()=>{
        navigate(`/notes/${props.note._id}`)
    }

    return (
        <>
            <div className={`note_grp_container mode-${colorMode}`}>
                <div className={`note_grp_content textmode-${colorMode}`}>
                    <h1 className="group_title" onClick={handleGetNotes}>{props.note.title}</h1>
                    <i className="far fa-trash-alt" onClick={handleDelete}></i>
                </div>
            </div>
            
        </>
    )
}
