import React, { useContext, useEffect } from 'react'
import NoteGroupItem from './NoteGroupItem'
import noteContext from '../../context/notes/NoteContext';
import Spinner from '../Spinner/Spinner';

export default function Notes() {

    const { noteGroups,fetchNoteGroups,loading,setNoteGroups} = useContext(noteContext);
    useEffect(() => {
        fetchNoteGroups()
        return ()=>{
            setNoteGroups([])
        }
            // eslint-disable-next-line
    }, [])

    return (
        <>
            {loading && <Spinner />}
            <div className="note_grp_main">
                {noteGroups && 
                noteGroups.map((note) => {
                    return <NoteGroupItem key={note._id} note={note} />;
                })}
            </div>
        </>
    )
}
