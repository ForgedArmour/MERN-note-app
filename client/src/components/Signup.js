import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext'

export default function Signup() {
    const navigate = useNavigate();
    const { signUpProvider,colorMode } = useContext(noteContext);
    const [signupInputs, setSignupInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSignup = async (e) => {
        e.preventDefault();
        await signUpProvider(signupInputs.name, signupInputs.email, signupInputs.password,navigate)
    }
    const handleChange = (e) => {
        setSignupInputs({ ...signupInputs, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-4">
            <form>
                <h2 className={`my-4 textmode-${colorMode}`}>Signup</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`form-label textmode-${colorMode}`}>Username</label>
                    <input type="text" className={`form-control inputs-${colorMode}`} id="username" name="name" aria-describedby="nameHelp" required minLength={3} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`form-label textmode-${colorMode}`}>Email address</label>
                    <input type="email" className={`form-control inputs-${colorMode}`} id="email" name="email" aria-describedby="emailHelp" required onChange={handleChange} />
                    <div id="emailHelp" className={`form-text textmode-${colorMode}`}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className={`form-label textmode-${colorMode}`}>Password</label>
                    <input type="password" className={`form-control inputs-${colorMode}`} id="password" name="password" required minLength={5} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignup}>Submit</button>
            </form>
        </div>
    )
}
