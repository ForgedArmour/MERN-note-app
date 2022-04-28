import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import './Navbar.css'
import noteContext from '../context/notes/NoteContext'


export default function Navbar() {
    const { setDarkmode,setIsLogin,fetchUser,username,isLogin } = useContext(noteContext);
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogin(false)
        navigate("/login");
    }
    const handleDarkMode = () => {
        setDarkmode();
    }
    useEffect(()=>{
        fetchUser()
        // eslint-disable-next-line
    },[isLogin])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">NotesOrange</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {isLogin?username:"Account"}
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                    {localStorage.getItem('token') ?
                                        <li><Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link></li> :
                                        <><li><Link className="dropdown-item" to="/login">Login</Link></li>
                                            <li><Link className="dropdown-item" to="/signup">Signup</Link></li></>}
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex align-item-center">
                            <p className="text-light darktext">Darkmode</p>
                            <label className="switch mx-3">
                                <input type="checkbox" />
                                <span className="slider round" onClick={handleDarkMode}></span>
                            </label>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}
