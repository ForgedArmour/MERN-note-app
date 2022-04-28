import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import noteContext from '../../context/notes/NoteContext';
import AddNote from '../AddNote/AddNote';
import NoteItem from './NoteItem';
import Spinner from '../Spinner/Spinner';

export default function Notes() {
  let { groupId } = useParams()
  const { fetchNotes, notes, setNotes, colorMode, loading } = useContext(noteContext)
  useEffect(() => {
    fetchNotes(groupId)
    return () => {
      setNotes([])
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <div className="container notes_container_main my-5 p-2">
        <AddNote key={groupId} grpId={groupId} />
        <h1 className={`display-6 my-3 textmode-${colorMode}`}>Notes</h1>
        {loading && <Spinner />}
        {notes &&
          notes.map((note,index) => {
            return <NoteItem key={note._id} note={note} index={index+2} grpId={groupId} />;
          })}
          <p id={"nonote"} className={`text-muted textmode-${colorMode}`}></p>
      </div>
    </>
  )
}