import React,{useContext, useState} from 'react'
import noteContext from '../../context/notes/NoteContext'
import { useLocation,useParams,useNavigate } from 'react-router-dom';


export default function EditPage() {
    let navigate = useNavigate()
    let { noteId } = useParams()
    const { state } = useLocation();
    const {colorMode,updateNote} = useContext(noteContext);
    const [noteInputs,setNoteInputs] = useState({
        title:state.note.title,
        description:state.note.description?state.note.description:"",
        tag:state.note.tag?state.note.tag:""
    })
    const handleOnChange = (e)=>{
        setNoteInputs({...noteInputs, [e.target.name]:e.target.value});
    }
    const handleUpdateNote = async (e)=>{
        var lenTitle = noteInputs.title.length;

        if (lenTitle>=1) {
            e.preventDefault();
            await updateNote(noteId,noteInputs,navigate,state.grpId)
        }
    }
  return (
    <>
    <div className="container p-3">
        <h1 className={`display-5 my-4 textmode-${colorMode}`}>Edit Note</h1>
        <hr className='mb-4' />
        <div className="edit_form_contents">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className={`form-label textmode-${colorMode}`}>Title</label>
                    <input type="text" className={`form-control inputs-${colorMode}`} id="title" name="title" minLength={1} required onChange={handleOnChange} value={noteInputs.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className={`form-label textmode-${colorMode}`} >Description</label>
                    <textarea className={`form-control inputs-${colorMode}`} id="description" name="description" onChange={handleOnChange} value={noteInputs.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className={`form-label textmode-${colorMode}`} >Tag</label>
                    <input className={`form-control inputs-${colorMode}`} id="tag" name="tag" onChange={handleOnChange} value={noteInputs.tag} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
            </form>
        </div>
    </div>
    </>
  )
}
