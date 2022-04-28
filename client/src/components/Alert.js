import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

export default function Alert() {

    const {setMsg,msg} = useContext(noteContext);
    const handleClick = ()=>{
        setMsg({
            msg:"",
            msgType:""
        });
    }
    return (
        <>
            {msg.msg && <div className={`alert alert-${msg.msgType} alert-dismissible fade show hei`} role="alert">
                {msg.msg}
                <button type="button" className="btn-close btn-alert" onClick={handleClick}></button>
            </div>}

        </>
    )
}
