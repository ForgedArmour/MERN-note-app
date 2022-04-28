import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
export default function Login() {
    let navigate = useNavigate();
    const {loginProvider,colorMode} = useContext(noteContext);
    const [loginInputs,setLoginInputs] = useState({
        email:"",
        password:""
    })
    const handleLogin = async (e)=>{

        if (loginInputs.email.length>=1 && loginInputs.password.length>=5) {
            e.preventDefault();
            await loginProvider(loginInputs.email,loginInputs.password,navigate)
        }

    }
    const handleChange = (e)=>{
        setLoginInputs({...loginInputs,[e.target.name]:e.target.value})
    }

    return (        
        <div className="container mt-5">
            <form>
                <h2 className={`my-4 textmode-${colorMode}`}>Login to use NotesOrange</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`form-label textmode-${colorMode}`}>Email address</label>
                    <input type="email" className={`form-control inputs-${colorMode}`} id="exampleInputEmail1" aria-describedby="emailHelp" value={loginInputs.email} onChange={handleChange} name="email" required />
                    <div id="emailHelp" className={`form-text textmode-${colorMode}`}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className={`form-label textmode-${colorMode}`}>Password</label>
                    <input type="password" className={`form-control inputs-${colorMode}`} id="exampleInputPassword1" value={loginInputs.password} onChange={handleChange} name="password" required />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className={`form-check-input inputs-${colorMode}`} id="exampleCheck1" />
                    <label className={`form-check-label textmode-${colorMode}`} htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
        </div>
    )
}
