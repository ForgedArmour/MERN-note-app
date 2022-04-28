import React,{useContext, useState} from 'react'
import noteContext from '../../context/notes/NoteContext'
import './AddNote.css'
export default function AddNote(props) {
    const {addNote,colorMode} = useContext(noteContext);
    const [noteInputs,setNoteInputs] = useState({
        title:"",
        description:"",
        tag:""
    })

    const handleAddNote = (e)=>{
        
        var lenTitle = noteInputs.title.length;

        if (lenTitle>=1) {
            e.preventDefault();
            addNote(noteInputs.title,noteInputs.description,noteInputs.tag,props.grpId);
        }
        setNoteInputs({
            title:"",
            description:"",
            tag:""
        })

        
    }
    const handleOnChange = (e)=>{
        setNoteInputs({...noteInputs, [e.target.name]:e.target.value});
    }
    return (
        <>
            <div className="accordion" id="accordionExample" >
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button text-primary collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Add Your Notes</button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className={`accordion-body mode-${colorMode}`}>
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

                        <button type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
