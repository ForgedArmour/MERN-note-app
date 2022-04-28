import React,{useContext} from 'react'
import About from './components/About/About'
import Home from './components/Home/Home'
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import noteContext from './context/notes/NoteContext';
import Notes from './components/Notes/Notes';
import EditPage from './components/EditPage/EditPage';


export default function App() {
  const {isLogin} = useContext(noteContext);
  const navbarProps = {
    title:"NotesOrange"
  }
  return (
    <>
      <Router>
          <Navbar  navbarProps = {navbarProps} />
          <Alert msg/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {!isLogin && <Route path="/login" element={<Login />} />}
              {!isLogin && <Route path="/signup" element={<Signup />} />}
              <Route path="/notes/:groupId" element={<Notes />} />
              <Route path="/notes/edit/:noteId" element={<EditPage />} />
          </Routes>
      </Router>
    </>
  )
}
