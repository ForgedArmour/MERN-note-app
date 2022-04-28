import React, { useContext } from 'react'
import './NoteItem.css'
import noteContext from '../../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

export default function NoteItem(props) {
  let navigate = useNavigate()
  const { deleteNote } = useContext(noteContext);
  const handleDeleteNote = async () => {
    await deleteNote(props.note._id)
  }
  const handleEditNote = () => {
    navigate(`/notes/edit/${props.note._id}`, { state: { note: props.note, grpId: props.grpId } })
  }
  return (
    <>
      <div className={`accordion`} id={`note-accordian${props.index}`}>
        <div className={`accordion-item`}>
          <div className="card note_container">
            <h2 className="accordion-header" id={`heading${props.index}`}>
              <button className="accordion-button ac_btn_note collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${props.index}`} aria-expanded="false" aria-controls={`collapse${props.index}`}>
                <div className="btn_content">
                  <span>{props.note.title}<i className="fa fa-angle-down mx-3"></i></span>
                  <span className="badge">{props.note.tag}</span>
                </div>
              </button>

            </h2>

            <div id={`collapse${props.index}`} className="accordion-collapse collapse" aria-labelledby={`heading${props.index}`} data-bs-parent={`#note-accordian${props.index}`}>
              <div className="card-body accordion-body">
                <div className="note_btn_group">
                  <button className="btn btn-primary py-1" onClick={handleEditNote}>Edit</button>
                  <button className="btn btn-danger py-1 mx-2" onClick={handleDeleteNote}>Delete</button>
                </div>
                <span className="badge mb-3"># {props.note.tag}</span>
                <p>{props.note.description ? props.note.description : <span className='text-muted'>Description empty..</span>}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}